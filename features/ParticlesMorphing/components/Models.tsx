import { useGLTF } from "@react-three/drei";

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
import { useThree } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";

import gsap from "gsap";

export default function Models() {
	const models = useGLTF("/assets/ParticlesMorphing/models.glb");
	const isTransitioning = useRef<boolean>(false);
	const currentIndexRef = useRef(0);
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

	const handleClick = async (nextIdex: number) => {
		if (pointsRef.current && !isTransitioning.current) {
			pointsRef.current.geometry.attributes.position =
				positions[currentIndexRef.current];
			pointsRef.current.geometry.attributes.aPositionTarget =
				positions[nextIdex];

			await gsap.fromTo(
				pointsRef.current.material.uniforms.uProgress,
				{
					value: 0,
				},
				{
					value: 1,
					duration: 3,
					ease: "linear",
					onStart: () => {
						isTransitioning.current = true;
					},
					onComplete: () => {
						currentIndexRef.current = nextIdex;
						isTransitioning.current = false;
					},
				}
			);
		}
	};

	const { size, colorA, colorB } = useControls({
		size: 0.1,
		colorA: "#ff7300",
		colorB: "#0091ff",
		progress: {
			value: 0,
			min: 0,
			max: 1,
			onChange: (val) => {
				if (pointsRef.current) {
					pointsRef.current.material.uniforms.uProgress.value = val;
				}
			},
		},
		morphTo0: button(() => {
			handleClick(0);
		}),
		morphTo1: button(() => {
			handleClick(1);
		}),
		morphTo2: button(() => {
			handleClick(2);
		}),
		morphTo3: button(() => {
			handleClick(3);
		}),
	});

	const gl = useThree((state) => state.gl);
	const pixelRatio = gl.getPixelRatio();
	const { width, height } = useThree((state) => state.size);

	const [staticUniforms] = useState(() => ({
		uProgress: new Uniform(0),
	}));

	const [attributes] = useState(() => ({
		position: positions[0],
		aPositionTarget: positions[0],
		aSize: sizes,
	}));

	return (
		<>
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
						uResolution: new Uniform([width * pixelRatio, height * pixelRatio]),
						uColorA: new Uniform(new Color(colorA)),
						uColorB: new Uniform(new Color(colorB)),
						...staticUniforms,
					}}
				/>
			</points>
		</>
	);
}

useGLTF.preload("/assets/ParticlesMorphing/models.glb");
