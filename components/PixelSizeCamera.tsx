"use client";

import { PerspectiveCamera } from "three";
import { PerspectiveCamera as PerspectiveCameraDrei } from "@react-three/drei";
import React, { ComponentProps, useLayoutEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";

type Props = ComponentProps<typeof PerspectiveCameraDrei> & {
	distance?: number;
};

const calculateCameraFov = (height: number, distance: number) =>
	Math.atan(height / 2 / distance) * (180 / Math.PI) * 2;

export const PixelSizeCamera = React.forwardRef<PerspectiveCamera, Props>(
	({ distance = 600, near = 1, far = 1000, ...rest }, ref) => {
		const cameraRef = useRef<PerspectiveCamera>(null);
		const innerRef = ref ? ref : cameraRef;

		const { height } = useThree((state) => state.size);

		useLayoutEffect(() => {
			if (cameraRef.current) {
				cameraRef.current.fov = calculateCameraFov(height, distance);
			}
		}, [distance, height]);

		return (
			<PerspectiveCameraDrei
				ref={innerRef}
				position-z={distance}
				near={near}
				far={far}
				fov={calculateCameraFov(height, distance)}
				makeDefault
				{...rest}
			/>
		);
	}
);

PixelSizeCamera.displayName = "PixelSizeCamera";
