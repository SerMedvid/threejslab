import { useCallback, useMemo, useRef } from "react";
import { getWheelById, wheels } from "../../data";
import useStore from "../../stores/useStore";
import BaseOverlay from "./BaseOverlay";
import { useSize } from "ahooks";
import ImageSliderWithMagnifier from "../ImageSliderWithMagnifier";

export default function WheelOverlay() {
	const focusedWheel = useStore((store) => store.focusedWheel);

	const wheel = useMemo(() => {
		return getWheelById(focusedWheel);
	}, [focusedWheel]);

	const setWheel = useStore((store) => store.setWheel);
	const setIsTransition = useStore((store) => store.setIsTransition);

	const onClick = useCallback(() => {
		setWheel(focusedWheel);
		setIsTransition(true);
	}, [focusedWheel, setWheel, setIsTransition]);

	const overlayRef = useRef<HTMLDivElement>(null);

	const { width } = useSize(overlayRef) || {
		width: typeof window !== "undefined" ? window?.innerWidth : 0,
	};
	const offsetDistance = width / 2;

	if (!wheel) return null;

	return (
		<BaseOverlay
			ref={overlayRef}
			header="Chose your wheels"
			onClick={onClick}
			currentFocused={wheel}
			visible={!!wheel}
			delay={1}
			items={wheels}
			offsetDistance={offsetDistance}
		>
			<ImageSliderWithMagnifier
				items={wheels}
				currentFocused={wheel}
				offsetDistance={offsetDistance}
				itemsPerView={7}
			/>
		</BaseOverlay>
	);
}
