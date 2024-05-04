import { useGLTF, useScroll } from "@react-three/drei";

import vertexShader from "../shaders/vertexShader.glsl";
import fragmentShader from "../shaders/fragmentShader.glsl";
import { button, useControls } from "leva";
import {
	AdditiveBlending,
	BufferAttribute,
	Color,
	Mesh,
	Points,
	ShaderMaterial,
	SphereGeometry,
	Uniform,
} from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";

import GroupControl from "./GroupControl";

const size = 0.075;
const colorA = "#ff7300";
const colorB = "#0091ff";

export default function Models() {
	const scroll = useScroll();

	const models = useGLTF("/assets/ParticlesMorphing/particles-models.glb");

	const ref = useRef<SphereGeometry>(null);
	const pointsRef = useRef<Points<SphereGeometry, ShaderMaterial>>(null);

	const { positions, sizes } = useMemo(() => {
		const { originalPositions, maxCount } = models.scene.children.reduce<{
			originalPositions: BufferAttribute[];
			maxCount: number;
		}>(
			(acc, child) => {
				if (child instanceof Mesh) {
					acc.originalPositions.push(child.geometry.attributes.position);

					acc.maxCount =
						child.geometry.attributes.position.count > acc.maxCount
							? child.geometry.attributes.position.count
							: acc.maxCount;
				}

				return acc;
			},
			{ originalPositions: [], maxCount: 0 }
		);

		const unifiedPositions = originalPositions.map((position) => {
			const newArr = new Float32Array(maxCount * 3);

			newArr.set(position.array);

			for (let i = position.count; i < maxCount; i++) {
				const i3 = i * 3;
				const randomIndex = Math.floor(position.count * Math.random()) * 3;
				newArr[i3 + 0] = position.array[randomIndex + 0];
				newArr[i3 + 1] = position.array[randomIndex + 1];
				newArr[i3 + 2] = position.array[randomIndex + 2];
			}

			return new BufferAttribute(newArr, 3);
		});

		const sizesArray = new Float32Array(maxCount);

		for (let i = 0; i < maxCount; i++) {
			sizesArray[i] = Math.random();
		}

		return {
			positions: unifiedPositions,
			sizes: new BufferAttribute(sizesArray, 1),
		};
	}, [models]);

	const gl = useThree((state) => state.gl);
	const pixelRatio = gl.getPixelRatio();
	const { width, height } = useThree((state) => state.size);

	const [staticUniforms] = useState(() => ({
		uProgress: new Uniform(0),
		uTime: new Uniform(0),
	}));

	const [attributes] = useState(() => ({
		position: positions[0],
		aPositionTarget: positions[0],
		aSize: sizes,
	}));

	useFrame((_, delta) => {
		if (pointsRef.current) {
			const { offset, pages } = scroll;
			const clampPages = pages / 2;

			const animationProgress = (offset * pages) % 2;
			const particlesProgress = Math.max(0, animationProgress - 1);
			const index = Math.min(Math.floor(offset * clampPages), clampPages - 1);
			const nextIndex = Math.min(index + 1, clampPages - 1);

			pointsRef.current.geometry.attributes.position = positions[index];
			pointsRef.current.geometry.attributes.aPositionTarget =
				positions[nextIndex];

			pointsRef.current.material.uniforms.uProgress.value = particlesProgress;
			pointsRef.current.material.uniforms.uTime.value += delta;
		}
	});

	return (
		<>
			<GroupControl>
				<points
					ref={pointsRef}
					frustumCulled={false}
				>
					<bufferGeometry
						ref={ref}
						attributes={{
							...attributes,
						}}
					></bufferGeometry>
					<shaderMaterial
						toneMapped={false}
						depthWrite={false}
						blending={AdditiveBlending}
						key={Date.now()}
						vertexShader={vertexShader}
						fragmentShader={fragmentShader}
						uniforms={{
							uSize: new Uniform(size),
							uResolution: new Uniform([
								width * pixelRatio,
								height * pixelRatio,
							]),
							uColorA: new Uniform(new Color(colorA)),
							uColorB: new Uniform(new Color(colorB)),
							...staticUniforms,
						}}
					/>
				</points>
			</GroupControl>
		</>
	);
}

useGLTF.preload("/assets/ParticlesMorphing/models.glb");
