import { CameraControls } from "@react-three/drei";
import { useTimeout } from "ahooks";
import { ElementRef, useRef } from "react";

export default function CameraSetup() {
	const ref = useRef<ElementRef<typeof CameraControls>>(null);
	const isResting = useRef(true);

	useTimeout(() => {
		ref.current?.setLookAt(5, 7.2, 7.6, -0.84, 5, 1.83, true);
	}, 300);

	return (
		<>
			<CameraControls
				ref={ref}
				smoothTime={0.5}
				onEnd={() => {
					isResting.current = true;
				}}
				onStart={() => {
					isResting.current = false;
				}}
			/>
		</>
	);
}
