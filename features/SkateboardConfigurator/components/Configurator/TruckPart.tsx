import useStore from "../../stores/useStore";
import { ConfigurationPhase } from "../../types";
import { TruckModel } from "../Models/TruckModel";
import TruckSlider from "../Sliders/TruckSlider/TruckSlider";
import { trucks } from "../../data";
import { useMemo } from "react";

export default function TruckPart() {
	const isTruckPhase = useStore(
		(state) => state.configurationPhase === ConfigurationPhase.TRUCK
	);
	const truckId = useStore((state) => state.config.truck);

	const truckTexture = useMemo(() => {
		return trucks.find((el) => el.id === truckId);
	}, [truckId]);

	const isTruckDefined = !!truckTexture;

	return (
		<>
			<TruckSlider visible={isTruckPhase} />
			<TruckModel
				manageOpacity={false}
				texture={isTruckDefined ? truckTexture.texture : trucks[0].texture}
				visible={isTruckDefined && !isTruckPhase}
			/>
		</>
	);
}
