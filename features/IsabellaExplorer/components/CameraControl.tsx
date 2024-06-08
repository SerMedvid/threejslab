import { CameraControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useLayoutEffect, useRef, useState } from "react";
import { Vector3 } from "three";
import { degToRad } from "three/src/math/MathUtils.js";

const vec = new Vector3();
const vec2 = new Vector3();

export default function CameraControl() {
	const cameraControlsRef = useRef<CameraControls>(null);

	useLayoutEffect(() => {
		if (cameraControlsRef.current) {
			const originalTouches = cameraControlsRef.current.touches;
			const originalMouseButtons = cameraControlsRef.current.mouseButtons;

			cameraControlsRef.current.setLookAt(
				-1.37,
				3.05,
				2.48,
				-0.57,
				0.91,
				-0.31
			);

			cameraControlsRef.current.touches = {
				one: 0,
				two: 0,
				three: 0,
			};
			cameraControlsRef.current.mouseButtons = {
				left: 0,
				wheel: 0,
				middle: 0,
				right: 0,
			};

			setTimeout(async () => {
				if (cameraControlsRef.current) {
					cameraControlsRef.current.restThreshold = 0.05;
					await cameraControlsRef.current.rotatePolarTo(degToRad(95), true);

					cameraControlsRef.current.restThreshold = 0.025;
					cameraControlsRef.current.smoothTime = 0.5;

					await cameraControlsRef.current.setLookAt.apply(
						cameraControlsRef.current,
						window.innerWidth < 768
							? [1.31, 1.74, 4.39, -0.49, 1.03, -0.6, true]
							: [0.018, 1.64, 2.62, -0.92, 1.06, -0.34, true]
					);

					cameraControlsRef.current.touches = originalTouches;
					cameraControlsRef.current.mouseButtons = originalMouseButtons;
					cameraControlsRef.current.maxAzimuthAngle = degToRad(130);
				}
			}, 300);
		}
	}, []);

	return (
		<CameraControls
			ref={cameraControlsRef}
			smoothTime={0.3}
			maxAzimuthAngle={degToRad(90)}
			minAzimuthAngle={degToRad(-90)}
			maxPolarAngle={degToRad(90)}
			minPolarAngle={degToRad(-90)}
		/>
	);
}
