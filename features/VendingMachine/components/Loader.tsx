import { Html, useProgress } from "@react-three/drei";
import { useDebounceEffect } from "ahooks";
import React, { useEffect, useRef, useState } from "react";
import useStore from "../store/useStore";
import Lottie from "lottie-react";

import loaderAnimation from "../assets/placeholder.json";

export default function Loader() {
	const { progress } = useProgress();
	const prevProgress = useRef(0);
	const [canShow, setCanShow] = useState(true);
	const [animateOut, setAnimateOut] = useState(false);
	const isReady = useStore((state) => state.isReady);

	useEffect(() => {
		prevProgress.current = Math.floor(Math.max(prevProgress.current, progress));
	}, [progress]);

	useDebounceEffect(
		() => {
			if (isReady) {
				setAnimateOut(true);

				setTimeout(() => {
					setCanShow(false);
				}, 1000);
			}
		},
		[isReady],
		{ wait: 100 }
	);

	if (!canShow) return null;

	return (
		<Html fullscreen>
			<div
				className={`bg-neutral-950 w-[100vw] h-[100svh] flex duration-1000 px-4 py-4 justify-center items-center ${
					animateOut ? "translate-y-full" : "translate-y-0"
				}`}
			>
				<div className="flex flex-col max-w-xs text-white justify-center">
					<Lottie
						animationData={loaderAnimation}
						loop={true}
					/>
					<h1 className="text-center">
						Cooking your experience {prevProgress.current}%
					</h1>
				</div>
			</div>
		</Html>
	);
}
