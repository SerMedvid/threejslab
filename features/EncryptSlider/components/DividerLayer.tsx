import { Points } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { AdditiveBlending, Group, Mesh, ShaderMaterial } from "three";

import fragShader from "../shaders/dividerFrag.glsl";
import vertexShader from "../shaders/dividerVertex.glsl";

import fragLineShader from "../shaders/dividerLineFrag.glsl";
import vertexLineShader from "../shaders/dividerLineVertex.glsl";
import useStore from "../store/useStore";
import { easing } from "maath";

const range = (start: number, end: number) =>
	start + Math.random() * (end - start);

type Props = {
	height: number;
	particlesCount?: number;
	maxScale?: number;
};

export default function DividerLayer({
	height,
	particlesCount = 3000,
	maxScale = 2,
}: Props) {
	const { positionsBuffer, sizesBuffer, velocityBuffer, distanceBuffer } =
		useMemo(() => {
			const positions = new Float32Array(particlesCount * 3);
			const sizes = new Float32Array(particlesCount);
			const velocity = new Float32Array(particlesCount);
			const distance = new Float32Array(particlesCount);

			for (let i = 0; i < particlesCount; i++) {
				const i3 = i * 3;
				positions[i3] = 0;
				positions[i3 + 1] =
					(Math.random() - 0.5) * height * 0.5 +
					(Math.random() - 0.5) * height * 0.5;
				positions[i3 + 2] = 0;

				sizes[i] = range(1, 35);
				velocity[i] = range(0.1, 1);
				distance[i] = range(0.1, 1);
			}

			return {
				positionsBuffer: positions,
				sizesBuffer: sizes,
				velocityBuffer: velocity,
				distanceBuffer: distance,
			};
		}, [height, particlesCount]);

	const shaderRef = useRef<ShaderMaterial>(null);
	const lineRef = useRef<Mesh>(null);
	const lineWrapperRef = useRef<Group>(null);
	const lineShaderRef = useRef<ShaderMaterial>(null);
	const isIntersectingRef = useRef(false);

	useEffect(() => {
		useStore.subscribe(
			(state) => state.intersected,
			(val) => {
				isIntersectingRef.current = val;
			}
		);
	});

	useFrame((_, delta) => {
		if (shaderRef.current) {
			shaderRef.current.uniforms.uTime.value += delta;
		}

		if (lineRef.current) {
			easing.damp(
				lineRef.current.scale,
				"x",
				maxScale * (isIntersectingRef.current ? 1 : 0.1),
				isIntersectingRef.current ? 0.15 : 0,
				delta
			);

			if (lineShaderRef.current?.uniforms.uDiscardLeft) {
				lineShaderRef.current.uniforms.uDiscardLeft.value =
					lineRef.current.scale.x > maxScale * 0.1 + 0.005;
			}
		}

		if (shaderRef.current) {
			easing.damp(
				shaderRef.current.uniforms.uOpacity,
				"value",
				isIntersectingRef.current ? 1 : 0,
				0.1,
				delta
			);
			easing.damp(
				shaderRef.current.uniforms.uMaxOffset,
				"value",
				isIntersectingRef.current ? 1 : 0.1,
				0.25,
				delta
			);
		}
	});

	return (
		<>
			<group
				ref={lineWrapperRef}
				position-z={-0.01}
			>
				<mesh
					ref={lineRef}
					scale-y={height * 1.1}
					scale-x={0.1}
				>
					<planeGeometry args={[1, 1]} />
					<shaderMaterial
						ref={lineShaderRef}
						transparent
						key={Date.now().toString()}
						vertexShader={vertexLineShader}
						fragmentShader={fragLineShader}
						uniforms={{
							uDiscardLeft: {
								value: false,
							},
						}}
					/>
				</mesh>
			</group>

			<group position-z={0.01}>
				<Points
					positions={positionsBuffer}
					sizes={sizesBuffer}
				>
					<bufferAttribute
						attach={"geometry-attributes-aVelocity"}
						args={[velocityBuffer, 1]}
					/>
					<bufferAttribute
						attach={"geometry-attributes-aDistance"}
						args={[distanceBuffer, 1]}
					/>

					<shaderMaterial
						key={Date.now().toString()}
						ref={shaderRef}
						transparent
						blending={AdditiveBlending}
						vertexShader={vertexShader}
						fragmentShader={fragShader}
						uniforms={{
							uTime: {
								value: 0,
							},
							uMaxOffset: {
								value: 0.1,
							},
							uOpacity: {
								value: 0,
							},
						}}
					/>
				</Points>
			</group>
		</>
	);
}
