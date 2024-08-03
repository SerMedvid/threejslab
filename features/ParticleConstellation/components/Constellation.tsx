import { Points } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { AdditiveBlending, ShaderMaterial, Points as PointsObj } from "three";

import fragShader from "../shaders/constellationFragment.glsl";
import vertexShader from "../shaders/constellationVertex.glsl";
import ConnectionLines from "./ConnectionLines";

type Props = {
	count: number;
};

const range = (start: number, end: number) =>
	start + Math.random() * (end - start);

export default function Constellation({ count }: Props) {
	const { width, height } = useThree((state) => state.viewport);

	const shaderRef = useRef<ShaderMaterial>(null);
	const pointsRef = useRef<PointsObj>(null);

	const { position, size, speed, direction } = useMemo(() => {
		const position = new Float32Array(count * 3);
		const size = new Float32Array(count);
		const speed = new Float32Array(count);
		const direction = new Float32Array(count * 2);

		for (let i = 0; i < count; i++) {
			position[i * 3 + 0] = (Math.random() - 0.5) * width;
			position[i * 3 + 1] = (Math.random() - 0.5) * height;
			position[i * 3 + 2] = (Math.random() - 0.5) * 4;

			size[i] = range(30, 50);
			speed[i] = range(0.005, 0.015);

			direction[i * 3 + 0] = Math.random() - 0.5;
			direction[i * 3 + 1] = Math.random() - 0.5;
		}

		return { position, size, speed, direction };
	}, [count, width, height]);

	useFrame(() => {
		if (pointsRef.current) {
			for (let i = 0; i < count; i++) {
				const i3 = i * 3;
				const i2 = i * 2;
				const speedAttr = pointsRef.current.geometry.attributes.aSpeed.array[i];

				pointsRef.current.geometry.attributes.position.array[i3 + 0] +=
					pointsRef.current.geometry.attributes.aDirection.array[i2 + 0] *
					speedAttr;
				pointsRef.current.geometry.attributes.position.array[i3 + 1] +=
					pointsRef.current.geometry.attributes.aDirection.array[i2 + 1] *
					speedAttr;

				if (
					Math.abs(
						pointsRef.current.geometry.attributes.position.array[i3 + 0]
					) >
					width / 2
				) {
					pointsRef.current.geometry.attributes.aDirection.array[i2 + 0] *= -1;
				}

				if (
					Math.abs(
						pointsRef.current.geometry.attributes.position.array[i3 + 1]
					) >
					height / 2
				) {
					pointsRef.current.geometry.attributes.aDirection.array[i2 + 1] *= -1;
				}
			}

			pointsRef.current.geometry.attributes.position.needsUpdate = true;
		}
	});

	return (
		<>
			<Points
				key={count}
				positions={position}
				sizes={size}
				ref={pointsRef}
			>
				<bufferAttribute
					attach={"geometry-attributes-aSpeed"}
					args={[speed, 1]}
				/>

				<bufferAttribute
					attach={"geometry-attributes-aDirection"}
					args={[direction, 2]}
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
						uWidth: {
							value: width,
						},
					}}
				/>
			</Points>
			<ConnectionLines pointsRef={pointsRef} />
		</>
	);
}
