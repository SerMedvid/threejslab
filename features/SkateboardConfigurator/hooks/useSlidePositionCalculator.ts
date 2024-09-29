import { useFrame, useThree } from "@react-three/fiber";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { Group, Vector3 } from "three";
import { MathUtils } from "three/src/math/MathUtils.js";
import useStore from "../stores/useStore";
import { easing } from "maath";

type Props = {
	slideIdx: number;
	positionOffset: number;
	totalSlides: number;
	needCalculatePosition?: boolean;
	calculatePositionCallback?: (slide: RefObject<Group>) => void;
	releaseCallback?: (slide: RefObject<Group>) => void;
	lerpDuration?: number;
	swipingModifier?: number;
};

export default function useSlidePositionCalculator({
	slideIdx,
	positionOffset,
	totalSlides,
	needCalculatePosition,
	calculatePositionCallback,
	releaseCallback,
	lerpDuration = 0.09,
	swipingModifier = 1,
}: Props) {
	const slideRef = useRef<Group>(null);
	const movementDirection = useRef<number>(1);
	const prevPosition = useRef<number>(slideIdx * positionOffset);
	const targetPosition = useRef<number>(prevPosition.current);
	const { width: viewportWidth } = useThree((state) => state.viewport);
	const setMovementX = useStore((store) => store.setMovementX);
	const [worldPosition] = useState(() => new Vector3());
	const deltaRef = useRef<number>(0);

	const calculatePositionCallbackFn = useCallback(() => {
		calculatePositionCallback && calculatePositionCallback(slideRef);
	}, [calculatePositionCallback]);

	const releaseCallbackFn = useCallback(() => {
		releaseCallback && releaseCallback(slideRef);
	}, [releaseCallback]);

	useEffect(() => {
		const unsubscribe = useStore.subscribe(
			(state) => state.movementX,
			(val) => {
				if (needCalculatePosition && val) {
					targetPosition.current += val / swipingModifier;
					movementDirection.current = Math.sign(val);
				}
			}
		);

		return () => {
			unsubscribe();
		};
	}, [needCalculatePosition, slideIdx, positionOffset, swipingModifier]);

	const resetPosition = useCallback(() => {
		if (slideRef.current) {
			targetPosition.current = slideRef.current.position.x =
				slideIdx * positionOffset;
		}
	}, [positionOffset, slideIdx]);

	const calculatePosition = useCallback(
		(force = false) => {
			if (slideRef.current) {
				if (
					Math.abs(slideRef.current.position.x - targetPosition.current) >
						0.001 ||
					force
				) {
					slideRef.current.getWorldPosition(worldPosition);

					easing.damp(
						slideRef.current.position,
						"x",
						targetPosition.current,
						lerpDuration,
						deltaRef.current
					);

					if (
						worldPosition.x + positionOffset * 2 <
							-viewportWidth / 2 - positionOffset &&
						movementDirection.current < 0
					) {
						targetPosition.current = slideRef.current.position.x =
							positionOffset * totalSlides + targetPosition.current;
					} else if (
						worldPosition.x - positionOffset * 2 >
							viewportWidth / 2 + positionOffset &&
						movementDirection.current > 0
					) {
						targetPosition.current = slideRef.current.position.x =
							-positionOffset * totalSlides + targetPosition.current;
					}

					calculatePositionCallbackFn();
				}
			}
		},
		[
			worldPosition,
			lerpDuration,
			positionOffset,
			viewportWidth,
			calculatePositionCallbackFn,
			totalSlides,
		]
	);

	useEffect(() => {
		if (needCalculatePosition) {
			resetPosition();
			calculatePosition(true);
		}
	}, [calculatePosition, needCalculatePosition, resetPosition]);

	/** pointer up - snap to closest */
	useEffect(() => {
		const unsubscribe = useStore.subscribe(
			(state) => state.isSwiping,
			(val) => {
				if (!val && slideRef.current && needCalculatePosition) {
					if (Math.abs(targetPosition.current) < positionOffset / 2) {
						setMovementX(-targetPosition.current * swipingModifier);

						releaseCallbackFn();
						prevPosition.current = targetPosition.current;
					}

					setMovementX(0);
				}
			}
		);

		return () => {
			unsubscribe();
		};
	}, [
		releaseCallbackFn,
		positionOffset,
		setMovementX,
		needCalculatePosition,
		swipingModifier,
	]);

	useFrame((_, delta) => {
		if (needCalculatePosition) {
			deltaRef.current = delta;
			calculatePosition();
		}
	});

	return {
		slideRef,
		resetPosition,
		calculatePosition,
		targetPosition,
	};
}
