import { useEffect } from "react";
import useStore from "../../../stores/useStore";
import { travelGroupTl } from "../../../utils";
import useSlidePositionCalculator from "@/features/SkateboardConfigurator/hooks/useSlidePositionCalculator";
import { ConfigurationPhase } from "@/features/SkateboardConfigurator/types";

type Props = JSX.IntrinsicElements["group"] & {
	children: React.ReactNode;
	idx: number;
	identifier: string;
	totalSlides: number;
};

export default function TruckSlide({
	children,
	identifier,
	idx,
	totalSlides,
	...rest
}: Props) {
	const setFocusedTruck = useStore((store) => store.setFocusedTruck);

	const isTruckScreen = useStore(
		(store) => store.configurationPhase === ConfigurationPhase.TRUCK
	);

	const isTransition = useStore((store) => store.isTransition);

	const positionOffset = 5;

	const { slideRef, targetPosition } = useSlidePositionCalculator({
		slideIdx: idx,
		positionOffset,
		totalSlides,
		swipingModifier: 50,
		needCalculatePosition: isTruckScreen,
		releaseCallback: () => {
			setFocusedTruck(identifier);
		},
		calculatePositionCallback: (slideRef) => {
			if (slideRef.current && !isTransition) {
				travelGroupTl(slideRef.current, undefined, {
					opacity:
						1 - Math.abs(slideRef.current.position.x) / (positionOffset / 2),
					duration: 0.5,
				});
			}
		},
	});

	useEffect(() => {
		if (!isTruckScreen) {
			travelGroupTl(slideRef.current, undefined, {
				opacity: 0,
			});
		}
	}, [isTruckScreen, slideRef]);

	return (
		<group
			ref={slideRef}
			position-x={targetPosition.current}
			{...rest}
		>
			{children}
		</group>
	);
}
