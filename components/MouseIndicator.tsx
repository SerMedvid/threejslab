"use client";

import { ElementRef, useEffect, useRef } from "react";
import { Mouse } from "./Icons";
import { gsap } from "gsap";

type Props = {
	horizontal?: boolean;
	vertical?: boolean;
	speed?: number;
	infinite?: boolean;
};

export default function MouseIndicator({
	horizontal,
	vertical,
	speed = 0.3,
	infinite,
}: Props) {
	const iconRef = useRef<ElementRef<"span">>(null);

	useEffect(() => {
		const timeline = gsap.timeline();

		if (horizontal) {
			timeline
				.delay(4)
				.add(
					gsap.to(iconRef.current, {
						x: -15,
						duration: speed,
						ease: "Power1.easeInOut",
					})
				)
				.add(
					gsap.to(iconRef.current, {
						x: 30,
						duration: speed * 2,
						ease: "Power1.easeInOut",
					})
				)
				.add(
					gsap.to(iconRef.current, {
						x: 0,
						duration: speed,
						ease: "Power1.easeIn",
					})
				)
				.set({}, {}, "+=4");
		}

		if (vertical) {
			timeline
				.add(
					gsap.to(iconRef.current, {
						y: -15,
						duration: speed,
						ease: "Power1.easeInOut",
					})
				)
				.add(
					gsap.to(iconRef.current, {
						y: 0,
						duration: speed,
						ease: "Power1.easeInOut",
					})
				)
				.set({}, {}, "+=4");
		}

		if (infinite) {
			timeline.repeat(-1);
		}

		return () => {
			timeline.clear();
		};
	}, [horizontal, vertical, infinite, speed]);

	return (
		<div className="absolute bottom-0 left-0 w-full text-center text-white mix-blend-difference	my-2">
			<span
				ref={iconRef}
				className="inline-block"
			>
				<Mouse
					height={30}
					width={30}
				/>
			</span>
		</div>
	);
}
