import { CameraControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { ElementRef, useLayoutEffect, useRef } from "react";
import { MathUtils } from "three";

export default function CameraSetup() {
	const ref = useRef<ElementRef<typeof CameraControls>>(null);
	const isResting = useRef(true);

	useLayoutEffect(() => {
		ref.current?.setLookAt(5, 7.2, 7.6, -0.84, 5, 1.83);
	}, []);

	// useFrame((_, delta) => {
	// 	if (isResting.current && ref.current) {
	// 		ref.current.azimuthAngle -= 20 * delta * MathUtils.DEG2RAD;
	// 	}
	// });

	return (
		<CameraControls
			ref={ref}
			onEnd={() => {
				isResting.current = true;
			}}
			onStart={() => {
				isResting.current = false;
			}}
		/>
	);
}
