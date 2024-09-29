import { RefObject, useEffect, useRef } from "react";
import { Group, MathUtils } from "three";
import useStore from "../stores/useStore";
import { ConfigurationPhase } from "../types";
import { useFrame, useThree } from "@react-three/fiber";
import { useDebounceEffect } from "ahooks";
import gsap from "gsap";
import { travelGroupTl } from "../utils";
import { trucks } from "../data";

type Props = {
	containerRef: RefObject<Group>;
	truckRef: RefObject<Group>;
};

export default function useTruckAnimation({ containerRef, truckRef }: Props) {
	const isTruckPhase = useStore(
		(store) => store.configurationPhase === ConfigurationPhase.TRUCK
	);
	const setIsTransition = useStore((store) => store.setIsTransition);

	const currentTextureIdx = useRef(0);
	const movementDirection = useRef(1);
	const isSwipingRef = useRef(false);
	const setFocusedTruck = useStore((store) => store.setFocusedTruck);

	const viewportWidth = useThree((state) => state.viewport.width);

	useFrame(() => {
		if (
			truckRef.current &&
			!isSwipingRef.current &&
			Math.abs(truckRef.current.position.x) > 0.0001 &&
			isTruckPhase
		) {
			truckRef.current.position.x = MathUtils.lerp(
				truckRef.current.position.x,
				0,
				0.05
			);

			travelGroupTl(truckRef.current, undefined, {
				opacity: 1 - Math.abs(truckRef.current.position.x * 3),
			});
		}
	});

	/** enter animation */
	useDebounceEffect(
		() => {
			if (isTruckPhase && containerRef.current && truckRef.current) {
				containerRef.current.rotation.x = 0;

				const tl = gsap
					.timeline({ defaults: { ease: "power1.in", duration: 0.75 } })

					.to(containerRef.current.rotation, {
						x: -Math.PI / 2 - 0.25,
					})
					.to(
						containerRef.current.position,
						{
							z: 220,
							y: -200,
						},
						"0"
					)
					.set(truckRef.current, {
						visible: true,
					})
					.add(() => {
						travelGroupTl(truckRef.current, tl, {
							opacity: 0,
							duration: 0,
						});
					}, "-100%")
					.add(() => {
						travelGroupTl(truckRef.current, tl, {
							opacity: 1,
							duration: 0.5,
						});
					})
					.to(truckRef.current.position, {
						z: 0,
						duration: 0.5,
					})
					.add(() => {
						setIsTransition(false);
					});

				return () => {
					tl.kill();
				};
			}
		},
		[containerRef, truckRef, isTruckPhase],
		{ wait: 250 }
	);

	useEffect(() => {
		const unsubscribe = useStore.subscribe(
			(state) => state.movementX,
			(val) => {
				if (isTruckPhase) {
					movementDirection.current = val < 0 ? -1 : 1;

					if (truckRef.current) {
						truckRef.current.position.x += val / (viewportWidth / 2);

						travelGroupTl(truckRef.current, undefined, {
							opacity: 1 - Math.abs(truckRef.current.position.x * 3),
						});
					}
				}
			}
		);

		return () => {
			unsubscribe();
		};
	}, [isTruckPhase, truckRef, viewportWidth]);

	useEffect(() => {
		const unsubscribe = useStore.subscribe(
			(state) => state.isSwiping,
			(val) => {
				if (!isTruckPhase) return;

				if (!val && truckRef.current) {
					const tl = gsap
						.timeline()
						.to(truckRef.current.position, {
							x: 1 * movementDirection.current,
							duration: 0.3,
						})
						.add(() => {
							currentTextureIdx.current =
								(movementDirection.current < 0
									? trucks.length - 1
									: currentTextureIdx.current + movementDirection.current) %
								trucks.length;
							setFocusedTruck(trucks[currentTextureIdx.current].id);
						})
						.set(truckRef.current.position, {
							x: movementDirection.current * -1.5,
						})
						.add(() => {
							isSwipingRef.current = val;
						});
				} else {
					isSwipingRef.current = val;
				}
			}
		);

		return () => {
			unsubscribe();
		};
	}, [isTruckPhase, setFocusedTruck, truckRef]);
}
