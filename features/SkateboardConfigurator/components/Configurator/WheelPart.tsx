import useStore from "../../stores/useStore";
import { ConfigurationPhase } from "../../types";
import { getWheelById, wheels } from "../../data";
import { useMemo } from "react";
import WheelSlider from "../Sliders/WheelSlider.tsx/WheelSlider";
import { WheelModel } from "../Models/WheelModel";

export default function WheelPart() {
	const isWheelPhase = useStore(
		(state) => state.configurationPhase === ConfigurationPhase.WHEEL
	);
	const wheelId = useStore((state) => state.config.wheel);

	const texture = useMemo(() => {
		return getWheelById(wheelId);
	}, [wheelId]);

	const iskDefined = !!texture;

	return (
		<>
			<WheelSlider visible={isWheelPhase} />
			<WheelModel
				manageOpacity={false}
				texture={iskDefined ? texture.texture : wheels[0].texture}
				visible={iskDefined && !isWheelPhase}
			/>
		</>
	);
}
