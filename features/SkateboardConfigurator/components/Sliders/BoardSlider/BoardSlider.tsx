import { useDebounceEffect } from "ahooks";
import { boards } from "../../../data";
import { BoardModel } from "../../Models/BoardModel";
import BoardSlide from "./BoardSlide";
import FakeShadow from "../../FakeShadow";
import { useState } from "react";
import { ConfigurationPhase } from "../../../types";
import useStore from "../../../stores/useStore";
import { useTexture } from "@react-three/drei";

export default function BoardSlider() {
	const [visible, setVisible] = useState(true);
	const isBoardScreen = useStore(
		(store) => store.configurationPhase === ConfigurationPhase.BOARD
	);

	const setFocusedBoard = useStore((store) => store.setFocusedBoard);
	const setMovementX = useStore((store) => store.setMovementX);
	useDebounceEffect(
		() => {
			if (!isBoardScreen) {
				setVisible(false);
				setFocusedBoard(null);
			} else {
				setVisible(true);
				setMovementX(1);
			}
		},
		[isBoardScreen],
		{ wait: 500 }
	);

	return (
		<group>
			{[...boards].map(({ id, texture }, idx, arr) => (
				<BoardSlide
					visible={visible}
					idx={idx}
					key={`${id}+${idx}`}
					identifier={id}
					totalSlides={arr.length}
				>
					<BoardModel
						texture={texture}
						renderBack={false}
						rotation={[-Math.PI / 2, -Math.PI / 2, 0]}
					/>
					<FakeShadow opacity={isBoardScreen ? 0.2 : 0} />
				</BoardSlide>
			))}
		</group>
	);
}

boards.forEach(({ texture }) => {
	useTexture.preload(texture);
});
