import { useThree } from "@react-three/fiber";
import React, { useEffect } from "react";
import useStore from "../../../stores/useStore";
import { ConfigurationPhase } from "../../../types";
import gsap from "gsap";
import { travelGroupTl } from "../../../utils";
import useSlidePositionCalculator from "@/features/SkateboardConfigurator/hooks/useSlidePositionCalculator";
import { useGSAP } from "@gsap/react";
import { Object3D } from "three";

type Props = JSX.IntrinsicElements["group"] & {
	children: React.ReactNode;
	idx: number;
	identifier: string;
	totalSlides: number;
};

const boardAspect = 0.27;
const dimensionsMofiier = 6.7;

export default function BoardSlide({
	children,
	idx,
	identifier,
	totalSlides,
	...rest
}: Props) {
	const viewportHeight = useThree((state) => state.viewport.height);
	const boardHeight = viewportHeight / dimensionsMofiier;
	const positionOffset = boardHeight * boardAspect * dimensionsMofiier;
	const setFocusedBoard = useStore((store) => store.setFocusedBoard);

	const isBoardScreen = useStore(
		(store) => store.configurationPhase === ConfigurationPhase.BOARD
	);

	const { slideRef: groupRef, targetPosition } = useSlidePositionCalculator({
		slideIdx: idx,
		needCalculatePosition: isBoardScreen,
		positionOffset,
		totalSlides,
		calculatePositionCallback: (slideRef) => {
			if (slideRef.current) {
				slideRef.current.position.z = Math.max(
					-Math.abs(slideRef.current.position.x / 1.5),
					-350
				);
			}
		},
		releaseCallback: () => {
			setFocusedBoard(identifier);
		},
	});

	useEffect(() => {
		if (idx === 0) {
			setFocusedBoard(identifier);
		}
	}, [identifier, setFocusedBoard, idx]);

	/** unmount */
	useGSAP(() => {
		if (groupRef.current) {
			if (!isBoardScreen) {
				const tl = gsap.timeline();

				if (Math.abs(groupRef.current.position.x) === 0) {
					tl.set(groupRef.current.position, {
						z: -650,
					});
				}

				travelGroupTl(groupRef.current, tl, {
					opacity: 0,
					duration: 0.3,
				});

				return () => {
					tl.kill();
				};
			} else {
				const elems: Object3D[] = [];

				groupRef.current.traverse((child) => {
					if (child.type === "Mesh" && child.name !== "FakeShadow") {
						elems.push(child);
					}
				});

				travelGroupTl(elems, undefined, {
					opacity: 1,
					duration: 0.3,
				});
			}
		}
	}, [isBoardScreen]);

	return (
		<group
			ref={groupRef}
			scale={boardHeight}
			position-x={targetPosition.current}
			{...rest}
			position-y={20}
		>
			{children}
		</group>
	);
}
