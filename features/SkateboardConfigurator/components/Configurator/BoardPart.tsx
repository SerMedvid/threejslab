import useStore from "../../stores/useStore";
import { boards } from "../../data";
import { useMemo } from "react";
import { BoardModel } from "../Models/BoardModel";

export default function BoardPart() {
	const boardId = useStore((state) => state.config.board);

	const board = useMemo(
		() => boards.find((el) => el.id === boardId),
		[boardId]
	);
	const isBoardDefined = !!board;

	return (
		<BoardModel
			visible={isBoardDefined}
			texture={isBoardDefined ? board.texture : boards[0].texture}
		/>
	);
}
