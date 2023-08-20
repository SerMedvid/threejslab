"use client";

import { useEffect, useRef } from "react";
import useStore from "../stores/useStore";
import { ANIMATION_DURATION, ANIMATION_EASE } from "../constants";
import { gsap } from "gsap";
import { DirectionalLight } from "three";

export default function Lights() {
	const dayLightRef = useRef<DirectionalLight>(null);
	const moonLightRef = useRef<DirectionalLight>(null);

	useEffect(() => {
		const unsubscribe = useStore.subscribe(
			(state) => state.isDay,
			(value) => {
				if (dayLightRef.current) {
					gsap.to(dayLightRef.current.position, {
						duration: ANIMATION_DURATION,
						ease: ANIMATION_EASE,
						y: value ? 20 : 0,
					});
					gsap.to(dayLightRef.current, {
						duration: ANIMATION_DURATION,
						ease: ANIMATION_EASE,
						intensity: value ? 3.5 : 0,
					});
				}

				if (moonLightRef.current) {
					gsap.to(moonLightRef.current.position, {
						duration: ANIMATION_DURATION,
						ease: ANIMATION_EASE,
						y: value ? 0 : 20,
					});

					gsap.to(moonLightRef.current, {
						duration: ANIMATION_DURATION,
						ease: ANIMATION_EASE,
						intensity: value ? 0 : 3.5,
					});
				}
			}
		);

		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<>
			<directionalLight
				ref={dayLightRef}
				name="SunLight"
				color={"#FFFFFF"}
				intensity={3.5}
				position={[10, 20, 10]}
				castShadow
				shadow-mapSize={[512, 512]}
				shadow-camera-near={0.5}
				shadow-camera-far={100}
				shadow-camera-left={-10}
				shadow-camera-bottom={-10}
				shadow-camera-top={10}
				shadow-camera-right={10}
			/>

			<directionalLight
				ref={moonLightRef}
				name="MoonLight"
				color={"#77ccff"}
				position={[-10, 20, 10]}
				castShadow
				shadow-mapSize={[512, 512]}
				shadow-camera-near={0.5}
				shadow-camera-far={100}
				shadow-camera-left={-10}
				shadow-camera-bottom={-10}
				shadow-camera-top={10}
				shadow-camera-right={10}
			/>
		</>
	);
}
