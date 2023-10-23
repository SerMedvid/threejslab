import { Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useDebounceEffect, useDebounceFn, useEventListener } from "ahooks";
import { useCallback, useEffect, useRef } from "react";
import useStore from "../stores/useStore";
import { MathUtils } from "three";

export default function Overlay() {
	const { width: viewportWidth } = useThree((state) => state.viewport);
	const start = useRef(0);
	const position = useRef(0);
	const current = useRef(0);
	const target = useRef(0);
	const last = useRef(0);
	const { setOffset, setDirection, planeWidth } = useStore();
	const isPressedRef = useRef(false);

	const overlayRef = useRef(null);

	const updateScroll = useCallback(() => {
		current.current = MathUtils.lerp(current.current, target.current, 0.05);

		setOffset(current.current);
		setDirection(current.current > last.current ? 1 : -1);

		last.current = current.current;
	}, [setDirection, setOffset]);

	useFrame(() => {
		if (Math.abs(current.current - target.current) > 0.01) {
			updateScroll();
		}
	});

	const snapItem = useCallback(() => {
		const itemIndex = Math.round(Math.abs(target.current) / planeWidth);
		const item = planeWidth * itemIndex;

		target.current = target.current > 0 ? item : -item;
	}, [planeWidth]);

	const { run: runSnapItem } = useDebounceFn(snapItem, { wait: 200 });

	useEffect(() => {
		updateScroll();
	}, [updateScroll]);

	useEffect(() => {
		target.current = 0.05;
	}, []);

	useDebounceEffect(
		() => {
			target.current -= 0.2;
		},
		[viewportWidth],
		{ wait: 100 }
	);

	useEventListener(
		"pointerdown",
		(evt) => {
			isPressedRef.current = true;
			start.current = evt.clientX;
			position.current = current.current;
		},
		{ target: overlayRef.current }
	);

	useEventListener(
		"pointermove",
		(evt) => {
			if (!isPressedRef.current) return;

			if (!evt.pressure) {
				isPressedRef.current = false;
				return;
			}

			const x = evt.clientX;
			const distance = (start.current - x) * 0.03;
			target.current = distance + position.current;
		},
		{
			target: overlayRef.current,
		}
	);

	useEventListener(
		"pointerup",
		() => {
			isPressedRef.current = false;
			snapItem();
		},
		{ target: overlayRef.current }
	);

	useEventListener(
		"wheel",
		(evt) => {
			target.current += evt.deltaY * 0.005;
			runSnapItem();
		},
		{ target: overlayRef.current }
	);

	return (
		<Html
			center={false}
			fullscreen={true}
		>
			<div
				ref={overlayRef}
				className="absolute w-full h-full top-0 left-0"
			/>
		</Html>
	);
}
