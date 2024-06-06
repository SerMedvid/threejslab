import { useEffect, useRef } from "react";
import { Color } from "three";
import useStore from "../store/useStore";
import { useMotionValue, useSpring } from "framer-motion";
import { useFrame } from "@react-three/fiber";

export default function AnimatedBackground() {
	const bgColorRef = useRef<Color>(null);
	const slideColor = useStore((state) => state.items[state.curSlide].color);
	const defaultSlideColor = useStore((state) => state.items[0].color);
	const colorMotionValue = useMotionValue(slideColor);
	const animatedColor = useSpring(colorMotionValue);

	useEffect(() => {
		if (bgColorRef.current) {
			animatedColor.set(slideColor);
		}
	}, [animatedColor, slideColor]);

	useFrame(() => {
		if (bgColorRef.current) {
			bgColorRef.current.set(animatedColor.get());
		}
	});

	return (
		<color
			attach={"background"}
			ref={bgColorRef}
			args={[defaultSlideColor]}
		/>
	);
}
