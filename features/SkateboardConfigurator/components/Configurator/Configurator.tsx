import { useThree } from "@react-three/fiber";
import { Group } from "three";
import BoardPart from "./BoardPart";
import TruckPart from "./TruckPart";
import { useRef } from "react";
import useConfiguratorAnimation from "../../hooks/useConfiguratorAnimation";
import WheelPart from "./WheelPart";

export default function Configurator() {
	const containerRef = useRef<Group>(null);

	const { height: viewportHeight } = useThree((state) => state.viewport);
	const boardHeight = viewportHeight / 6.7;

	useConfiguratorAnimation({
		containerRef,
		boardHeight,
	});

	return (
		<group>
			<group
				scale={boardHeight}
				position-y={20}
				ref={containerRef}
			>
				<BoardPart />
				<TruckPart />
				<WheelPart />
			</group>
		</group>
	);
}
