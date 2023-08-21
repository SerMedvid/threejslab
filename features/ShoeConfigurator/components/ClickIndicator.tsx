"use client";

import { ElementRef, useEffect, useRef, useState } from "react";
import { Click } from "../../../components/Icons";
import { gsap } from "gsap";
import useStore from "../stores/useStore";

export default function ClickIndicator() {
	const iconRef = useRef<ElementRef<"span">>(null);
	const [interacted, setInteracted] = useState(false);
	const timelineRef = useRef<gsap.core.Timeline>();

	useEffect(() => {
		const unsubscribe = useStore.subscribe(
			(state) => state.selected,
			(value) => {
				if (value) {
					setInteracted(true);
					unsubscribe();
				}
			}
		);

		return () => {
			unsubscribe();
		};
	}, []);

	useEffect(() => {
		if (interacted) {
			gsap.to(iconRef.current, {
				opacity: 0,
				duration: 0.3,
			});
			timelineRef.current?.kill();
		}
	}, [interacted]);

	useEffect(() => {
		timelineRef.current = gsap.timeline();

		timelineRef.current
			.delay(2)
			.add(
				gsap.to(iconRef.current, {
					x: 40,
					duration: 0.5,
				})
			)
			.add(
				gsap.to(iconRef.current, {
					scale: 0.85,
					duration: 0.2,
				})
			)
			.add(
				gsap.to(iconRef.current, {
					scale: 1,
					duration: 0.12,
				})
			)
			.set({}, {}, "+=2")
			.add(
				gsap.to(iconRef.current, {
					y: 30,
					duration: 0.5,
				})
			)
			.add(
				gsap.to(iconRef.current, {
					scale: 0.85,
					duration: 0.2,
				})
			)
			.add(
				gsap.to(iconRef.current, {
					scale: 1,
					duration: 0.12,
				})
			)
			.set({}, {}, "+=2")
			.add(
				gsap.to(iconRef.current, {
					x: 0,
					y: 0,
					duration: 0.5,
				})
			)
			.add(
				gsap.to(iconRef.current, {
					scale: 0.85,
					duration: 0.2,
				})
			)
			.add(
				gsap.to(iconRef.current, {
					scale: 1,
					duration: 0.12,
				})
			)
			.set({}, {}, "+=2")
			.repeat(-1);

		return () => {
			timelineRef.current?.kill();
		};
	}, []);

	return (
		<div className="absolute bottom-0 left-0 w-full text-center text-white mix-blend-difference	my-2">
			<span
				ref={iconRef}
				className="inline-block"
			>
				<Click
					height={30}
					width={30}
				/>
			</span>
		</div>
	);
}
