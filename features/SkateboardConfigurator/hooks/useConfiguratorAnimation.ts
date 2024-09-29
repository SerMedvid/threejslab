import { RefObject, useEffect, useRef } from "react";
import useStore from "../stores/useStore";
import { ConfigurationPhase } from "../types";
import { useFrame, useThree } from "@react-three/fiber";
import { Group, Vector3 } from "three";
import { easing } from "maath";
import { shallow } from "zustand/shallow";
import {
	boardEnterAnimation,
	finalPhaseAnimation,
	truckEnterAnimation,
	wheelEnterAnimation,
} from "../animation/configuratorAnimation";

type Props = {
	containerRef: RefObject<Group>;
	boardHeight: number;
};

const DEFAULT_TARGET_POSITION = new Vector3(0, 20, 0);

export default function useConfiguratorAnimation({
	containerRef,
	boardHeight,
}: Props) {
	const { height: viewportHeight, width: viewportWidth } = useThree(
		(state) => state.viewport
	);
	const setIsTransition = useStore((state) => state.setIsTransition);

	const timeline = useRef<gsap.core.Timeline>();
	const isTransition = useStore((state) => state.isTransition);

	const targetPosition = useRef(DEFAULT_TARGET_POSITION.clone());
	const animationScale =
		boardHeight *
		(viewportHeight > viewportWidth ? 1 : viewportWidth / viewportHeight);

	useEffect(() => {
		const unsubscribe = useStore.subscribe(
			(state) => state.configurationPhase,
			(phase) => {
				if (!containerRef.current) return;

				switch (phase) {
					case ConfigurationPhase.BOARD:
						targetPosition.current = DEFAULT_TARGET_POSITION.clone();
						boardEnterAnimation(
							containerRef,
							boardHeight,
							DEFAULT_TARGET_POSITION.clone()
						);
						break;

					case ConfigurationPhase.TRUCK:
						timeline.current = truckEnterAnimation(
							containerRef,
							animationScale,
							targetPosition
						);

						break;

					case ConfigurationPhase.WHEEL:
						timeline.current = wheelEnterAnimation(
							containerRef,
							animationScale,
							targetPosition
						);
						break;

					case ConfigurationPhase.FINAL:
						timeline.current = finalPhaseAnimation(containerRef, boardHeight);
				}
			},
			{ fireImmediately: true }
		);

		return () => {
			unsubscribe();
		};
	}, [animationScale, boardHeight, containerRef, setIsTransition]);

	/** Truck swipe movement */
	useEffect(() => {
		const unsubscribe = useStore.subscribe(
			(state) => ({
				configurationPhase: state.configurationPhase,
				movementX: state.movementX,
				isSwiping: state.isSwiping,
			}),
			({ configurationPhase, movementX, isSwiping }) => {
				if (
					containerRef.current &&
					configurationPhase === ConfigurationPhase.TRUCK
				) {
					targetPosition.current.copy(containerRef.current.position);

					targetPosition.current.x = isSwiping
						? containerRef.current.position.x + movementX
						: 0;
				} else if (
					containerRef.current &&
					configurationPhase === ConfigurationPhase.WHEEL
				) {
					targetPosition.current.copy(containerRef.current.position);

					targetPosition.current.x = isSwiping
						? containerRef.current.position.x + movementX
						: animationScale;
				}
			},
			{ equalityFn: shallow }
		);

		return () => {
			unsubscribe();
		};
	}, [animationScale, containerRef]);

	useFrame(() => {
		if (containerRef.current && !isTransition) {
			easing.damp3(containerRef.current.position, targetPosition.current, 0.2);
		}
	});
}
