import { Center } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { AdditiveBlending, BufferAttribute, Color } from "three";
import useModalConrols from "../hooks/useModelControlsStatic";
import { useControls } from "leva";

export default function ModelStatic() {
	const pointsRef = useRef(null);

	const {
		count,
		size,
		radius,
		branches,
		spin,
		randomness,
		randomnessPower,
		insideColor,
		outsideColor,
	} = useModalConrols();

	useControls({});

	const { position, color } = useMemo(() => {
		const position = new BufferAttribute(new Float32Array(count * 3), 3);
		const color = new BufferAttribute(new Float32Array(count * 3), 3);

		const colorInside = new Color(insideColor);
		const colorOutside = new Color(outsideColor);

		for (let i = 0; i < count; i++) {
			// Position
			const pointRadius = Math.random() * radius;
			const spinAngle = pointRadius * spin;
			const branchAngel = ((i % branches) / branches) * 2 * Math.PI;

			const randomX =
				Math.pow(Math.random(), randomnessPower) *
				(Math.random() < 0.5 ? 1 : -1) *
				randomness *
				pointRadius;
			const randomY =
				Math.pow(Math.random(), randomnessPower) *
				(Math.random() < 0.5 ? 1 : -1) *
				randomness *
				pointRadius;
			const randomZ =
				Math.pow(Math.random(), randomnessPower) *
				(Math.random() < 0.5 ? 1 : -1) *
				randomness *
				pointRadius;

			position.setXYZ(
				i,
				Math.cos(branchAngel + spinAngle) * pointRadius + randomX,
				randomY,
				Math.sin(branchAngel + spinAngle) * pointRadius + randomZ
			);

			// Color
			const mixedColor = colorInside.clone();
			mixedColor.lerp(colorOutside, pointRadius / radius);
			color.setXYZ(i, mixedColor.r, mixedColor.g, mixedColor.b);
		}

		return {
			position,
			color,
		};
	}, [
		count,
		insideColor,
		outsideColor,
		radius,
		spin,
		branches,
		randomnessPower,
		randomness,
	]);

	return (
		<Center>
			<points ref={pointsRef}>
				<pointsMaterial
					sizeAttenuation
					depthWrite={false}
					blending={AdditiveBlending}
					size={size}
					vertexColors
				/>
				<bufferGeometry
					attributes={{
						position,
						color,
					}}
				/>
			</points>
		</Center>
	);
}
