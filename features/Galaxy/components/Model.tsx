"use client";

import { Center } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import {
	AdditiveBlending,
	BufferAttribute,
	Color,
	ShaderMaterial,
} from "three";
import useModalConrols from "../hooks/useModelControls";

import vertexShader from "../shaders/vertex.glsl";
import fragShader from "../shaders/fragment.glsl";
import { useFrame, useThree } from "@react-three/fiber";

export default function Model() {
	const pointsRef = useRef(null);
	const materialRef = useRef<ShaderMaterial>(null);

	const {
		count,
		radius,
		branches,
		randomness,
		randomnessPower,
		insideColor,
		outsideColor,
	} = useModalConrols();

	const { gl, camera, clock } = useThree();

	useFrame((state) => {
		const { elapsedTime } = state.clock;

		if (materialRef.current) {
			materialRef.current.uniforms.uTime.value = elapsedTime;
		}
	});

	useEffect(() => {
		clock.start();
	}, [clock]);

	useEffect(() => {
		const originalPositionZ = camera.position.z;
		const originalPositionY = camera.position.y;

		camera.position.set(camera.position.x, 2, 3.5);

		return () => {
			camera.position.set(
				camera.position.x,
				originalPositionY,
				originalPositionZ
			);
		};
	}, [camera]);

	const { position, color, scales, randomnessAttr } = useMemo(() => {
		const position = new BufferAttribute(new Float32Array(count * 3), 3);
		const color = new BufferAttribute(new Float32Array(count * 3), 3);
		const scales = new BufferAttribute(new Float32Array(count * 1), 1);
		const randomnessAttr = new BufferAttribute(new Float32Array(count * 3), 3);

		const colorInside = new Color(insideColor);
		const colorOutside = new Color(outsideColor);

		for (let i = 0; i < count; i++) {
			// Position
			const pointRadius = Math.random() * radius;
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

			randomnessAttr.setXYZ(i, randomX, randomY, randomZ);

			position.setXYZ(
				i,
				Math.cos(branchAngel) * pointRadius,
				0,
				Math.sin(branchAngel) * pointRadius
			);

			// Color
			const mixedColor = colorInside.clone();
			mixedColor.lerp(colorOutside, pointRadius / radius);
			color.setXYZ(i, mixedColor.r, mixedColor.g, mixedColor.b);

			//Scale
			scales.setX(i, Math.random());
		}

		return {
			position,
			color,
			scales,
			randomnessAttr,
		};
	}, [
		count,
		insideColor,
		outsideColor,
		radius,
		branches,
		randomnessPower,
		randomness,
	]);

	return (
		<points ref={pointsRef}>
			<shaderMaterial
				ref={materialRef}
				key={Date.now()}
				depthWrite={false}
				blending={AdditiveBlending}
				vertexColors
				vertexShader={vertexShader}
				fragmentShader={fragShader}
				uniforms={{
					uTime: { value: 0 },
					uSize: { value: 30 * gl.getPixelRatio() },
				}}
			/>
			<bufferGeometry
				attributes={{
					position,
					color,
					aScale: scales,
					aRandomness: randomnessAttr,
				}}
			/>
		</points>
	);
}
