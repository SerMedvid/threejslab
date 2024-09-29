import { useCallback, useRef } from "react";
import { trucks } from "../../data";
import useStore from "../../stores/useStore";
import BaseOverlay from "./BaseOverlay";
import { useSize } from "ahooks";
import ImageSliderWithMagnifier from "../ImageSliderWithMagnifier";

export default function TruckOverlay() {
	const focusedTruck = useStore((store) => store.focusedTruck);
	const setTruck = useStore((store) => store.setTruck);
	const setIsTransition = useStore((store) => store.setIsTransition);

	const onClick = useCallback(() => {
		setTruck(focusedTruck);
		setIsTransition(true);
	}, [focusedTruck, setTruck, setIsTransition]);

	const currentTruck = trucks.find((el) => el.id === focusedTruck);
	const overlayRef = useRef<HTMLDivElement>(null);

	const { width } = useSize(overlayRef) || {
		width: typeof window !== "undefined" ? window.innerWidth : 0,
	};
	const offsetDistance = width / 2;

	if (!currentTruck) return null;

	return (
		<BaseOverlay
			ref={overlayRef}
			header="Choose your truck"
			onClick={onClick}
			items={trucks}
			currentFocused={currentTruck}
			visible={!!currentTruck}
			delay={1}
			offsetDistance={offsetDistance}
		>
			<ImageSliderWithMagnifier
				items={trucks}
				currentFocused={currentTruck}
				offsetDistance={offsetDistance}
				aspectRatio={0.75}
			/>
		</BaseOverlay>
	);
}
