"use client";

import useStore from "../../stores/useStore";
import { ConfigurationPhase } from "../../types";
import BoardOverlay from "./BoardOverlay";
import FinalOverlay from "./FinalOverlay";
import TruckOverlay from "./TruckOverlay";
import WheelOverlay from "./WheelOverlay";

export default function Overlay() {
	const { focusedBoard, selectedBoard, selectedTruck } = useStore((state) => ({
		focusedBoard: state.focusedBoard,
		selectedBoard: state.config.board,
		selectedTruck: state.config.truck,
	}));

	const isFinalOverlay = useStore(
		(state) => state.configurationPhase === ConfigurationPhase.FINAL
	);

	return (
		<>
			{focusedBoard && <BoardOverlay />}
			{selectedBoard && <TruckOverlay />}
			{selectedTruck && <WheelOverlay />}
			{isFinalOverlay && (
				<FinalOverlay
					visible={isFinalOverlay}
					delay={2}
				/>
			)}
		</>
	);
}
