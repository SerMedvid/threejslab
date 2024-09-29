import { useEffect, useRef } from "react";
import { trucks } from "../../../data";
import { TruckModel } from "../../Models/TruckModel";
import { Group } from "three";
import useStore from "../../../stores/useStore";
import { useTexture } from "@react-three/drei";
import TruckSlide from "./TruckSlide";
import { useDebounceEffect } from "ahooks";

type Props = JSX.IntrinsicElements["group"];

const TruckSlider = ({ visible, ...props }: Props) => {
	const ref = useRef<Group>(null);
	const setFocusedTruck = useStore((store) => store.setFocusedTruck);
	const selectedTruck = useStore((store) => store.config.truck);

	useDebounceEffect(
		() => {
			if (!visible && selectedTruck) {
				setFocusedTruck(null);
			}
		},
		[visible, selectedTruck],
		{ wait: 500 }
	);

	useEffect(() => {
		if (visible) {
			setFocusedTruck(trucks[0].id);
		}
	}, [setFocusedTruck, visible]);

	return (
		<group
			{...props}
			visible={visible}
			rotation-y={Math.PI / 2}
			ref={ref}
		>
			{trucks.map(({ id, texture }, idx, arr) => (
				<TruckSlide
					idx={idx}
					key={`${id}+${idx}`}
					identifier={id}
					totalSlides={arr.length}
					rotation-y={-Math.PI / 2}
				>
					<TruckModel texture={texture} />
				</TruckSlide>
			))}
		</group>
	);
};

TruckSlider.displayName = "TruckSlider";

export default TruckSlider;

trucks.forEach(({ texture }) => {
	useTexture.preload(texture);
});
