import { CameraControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { useCallback, useEffect, useRef } from "react";
import useStore from "../store/useStore";
import { useDebounceEffect } from "ahooks";

type Props = {
	slideDistance: number;
};

export default function WorldCamera({ slideDistance }: Props) {
	const { width } = useThree((state) => state.viewport);
	const cameraControlRef = useRef<CameraControls>(null);
	const prevSlideRef = useRef<number>(0);

	const { dollyDistance } = useControls({
		dollyDistance: {
			value: 10,
			min: 0,
			max: 50,
		},
	});

	const windowDistance = width + slideDistance;

	useDebounceEffect(
		() => {
			cameraControlRef.current?.setLookAt(
				prevSlideRef.current * windowDistance,
				0,
				5,
				prevSlideRef.current * windowDistance,
				0,
				0
			);
		},
		[windowDistance],
		{ wait: 200 }
	);

	const moveToSlide = useCallback(
		async (slide: number) => {
			await cameraControlRef.current?.setLookAt(
				prevSlideRef.current * windowDistance,
				3,
				dollyDistance,
				prevSlideRef.current * windowDistance,
				0,
				0,
				true
			);

			await cameraControlRef.current?.setLookAt(
				(slide + 1) * windowDistance,
				1,
				dollyDistance,
				slide * windowDistance,
				0,
				0,
				true
			);

			await cameraControlRef.current?.setLookAt(
				slide * windowDistance,
				0,
				5,
				slide * windowDistance,
				0,
				0,
				true
			);
		},
		[dollyDistance, windowDistance]
	);

	useEffect(() => {
		const unsubscribe = useStore.subscribe(
			(state) => state.currentSlide,
			(value) => {
				moveToSlide(value);
				prevSlideRef.current = value;
			}
		);

		return () => {
			unsubscribe();
		};
	}, [moveToSlide]);

	return (
		<CameraControls
			ref={cameraControlRef}
			touches={{
				one: 0,
				two: 0,
				three: 0,
			}}
			mouseButtons={{
				left: 0,
				wheel: 0,
				middle: 0,
				right: 0,
			}}
		/>
	);
}
