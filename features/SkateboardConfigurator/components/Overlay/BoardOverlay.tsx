import { useCallback } from "react";
import { boards } from "../../data";
import useStore from "../../stores/useStore";
import BaseOverlay from "./BaseOverlay";
import { LayoutOverlay } from "../../types";

export default function BoardOverlay() {
	const focusedBoard = useStore((store) => store.focusedBoard);
	const selectedBoard = useStore((store) => store.config.board);
	const setBoard = useStore((store) => store.setBoard);
	const setIsTransition = useStore((store) => store.setIsTransition);

	const onClick = useCallback(() => {
		setBoard(focusedBoard);
		setIsTransition(true);
	}, [focusedBoard, setBoard, setIsTransition]);

	const currentBoard = boards.find((el) => el.id === focusedBoard);

	if (!currentBoard) return null;

	return (
		<BaseOverlay
			header="Choose your board"
			onClick={onClick}
			items={boards}
			currentFocused={currentBoard}
			visible={!selectedBoard}
			layout={LayoutOverlay.STRATCHED}
			offsetDistance={160} // Adjusted to match TruckOverlay
		/>
	);
}
