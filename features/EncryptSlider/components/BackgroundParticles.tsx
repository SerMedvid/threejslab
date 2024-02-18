import { Points } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { AdditiveBlending, ShaderMaterial } from "three";
import fragShader from "../shaders/backgroundFrag.glsl";
import vertexShader from "../shaders/backgroundVertex.glsl";
import { useFrame, useThree } from "@react-three/fiber";

const PARTICLES_COUNT = 500;

const range = (start: number, end: number) =>
	start + Math.random() * (end - start);

type Props = {
	height: number;
};

export default function BackgroundParticles({ height }: Props) {
	const viewportWidth = useThree((state) => state.viewport.width);

	const {
		positionsBuffer,
		sizesBuffer,
		velocityBuffer,
		distanceBuffer,
		randomBuffer,
	} = useMemo(() => {
		const positions = new Float32Array(PARTICLES_COUNT * 3);
		const sizes = new Float32Array(PARTICLES_COUNT);
		const velocity = new Float32Array(PARTICLES_COUNT);
		const distance = new Float32Array(PARTICLES_COUNT);
		const random = new Float32Array(PARTICLES_COUNT);

		for (let i = 0; i < PARTICLES_COUNT; i++) {
			const i3 = i * 3;
			positions[i3] = 0;
			positions[i3 + 1] = (Math.random() - 0.5) * height;
			positions[i3 + 2] = range(0, -1);

			sizes[i] = range(1, 35);
			velocity[i] = range(0.1, 1);
			distance[i] = range(0.1, 1);
			random[i] = Math.random();
		}

		return {
			positionsBuffer: positions,
			sizesBuffer: sizes,
			velocityBuffer: velocity,
			distanceBuffer: distance,
			randomBuffer: random,
		};
	}, [height]);

	const shaderRef = useRef<ShaderMaterial>(null);

	useFrame((_, delta) => {
		if (shaderRef.current) {
			shaderRef.current.uniforms.uTime.value += delta;
		}
	});

	return (
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
			<bufferAttribute
				attach={"geometry-attributes-aRandom"}
				args={[randomBuffer, 1]}
			/>

			<shaderMaterial
				key={Date.now().toString()}
				ref={shaderRef}
				transparent
				blending={AdditiveBlending}
				vertexShader={vertexShader}
				fragmentShader={fragShader}
				depthTest={false}
				uniforms={{
					uTime: {
						value: 0,
					},
					uWidth: {
						value: viewportWidth,
					},
				}}
			/>
		</Points>
	);
}
