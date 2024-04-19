import { CameraControls } from "@react-three/drei";
import { useDebounceEffect } from "ahooks";
import { ElementRef, useRef } from "react";
import useStore from "../store/useStore";

export default function CameraSetup() {
	const ref = useRef<ElementRef<typeof CameraControls>>(null);
	const isReady = useStore((state) => state.isReady);

	useDebounceEffect(
		() => {
			ref.current?.setLookAt(5, 7.2, 7.6, -0.84, 5, 1.83, true);
		},
		[isReady],
		{ wait: 700 }
	);

	return (
		<>
			<CameraControls
				ref={ref}
				smoothTime={0.5}
			/>
		</>
	);
}
