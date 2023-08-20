import { ElementRef, useEffect, useRef } from "react";
import useStore from "../stores/useStore";
import { gsap } from "gsap";
import { ANIMATION_DURATION, ANIMATION_EASE } from "../constants";
import { Mouse } from "@/components/Icons";
import MouseIndicator from "@/components/MouseIndicator";

export default function Overlay() {
	const dayOverlayRef = useRef<ElementRef<"div">>(null);
	const nightOverlayRef = useRef<ElementRef<"div">>(null);

	useEffect(() => {
		const unsubscribe = useStore.subscribe(
			(state) => state.isDay,
			(value) => {
				gsap.to(dayOverlayRef.current, {
					duration: ANIMATION_DURATION,
					ease: ANIMATION_EASE,
					opacity: value ? 1 : 0,
				});

				gsap.to(nightOverlayRef.current, {
					duration: ANIMATION_DURATION,
					ease: ANIMATION_EASE,
					opacity: value ? 0 : 1,
				});
			}
		);

		return () => {
			unsubscribe();
		};
	});

	return (
		<>
			<div
				className=" absolute  w-full h-full opacity-100	 bg-gradient-to-tr from-[#ffdbb9]		 to-[#fdf3dc] top-0 left-0"
				ref={dayOverlayRef}
			/>
			<div
				className="absolute  w-full h-full opacity-0 bg-gradient-to-tr	from-[#0b1a2b] from-[33%] to-[#3a6291] to-[111%]	 top-0 left-0"
				ref={nightOverlayRef}
			/>
			<MouseIndicator
				horizontal
				infinite
				vertical
			/>
		</>
	);
}
