import { CameraControls } from "@react-three/drei";
import { useDebounceEffect } from "ahooks";
import { ElementRef, useRef } from "react";
import useStore from "../store/useStore";

export default function CameraSetup() {
	const ref = useRef<ElementRef<typeof CameraControls>>(null);
	const isReady = useStore((state) => state.isReady);

	useDebounceEffect(
		() => {
			const lookAtScene = async () => {
				const innerWidth = Math.max(window.innerWidth, 400);
				const zoomIndex = (1000 - Math.min(innerWidth, 1000)) / 1000;

				await ref.current?.setLookAt(
					6 + 12.2 * zoomIndex,
					7.6 + 4.6 * zoomIndex,
					10.3 + 15.1 * zoomIndex,
					-0.84,
					5,
					1.83,
					true
				);
			};

			lookAtScene();
		},
		[isReady],
		{ wait: 1000 }
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
