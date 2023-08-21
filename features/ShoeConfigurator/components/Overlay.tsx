"use client";

import useStore from "../stores/useStore";
import Circle from "@uiw/react-color-circle";

export default function Overlay() {
	const hovered = useStore((state) => state.hovered);
	const selected = useStore((state) => state.selected);
	const { setColor } = useStore();

	return (
		<div className="absolute bottom-0 left-0 p-4">
			<h2 className="text-4xl font-bold mb-2 capitalize">
				{selected ? selected : hovered}
			</h2>
			{!!selected && (
				<Circle
					colors={[
						"#f44336",
						"#e91e63",
						"#9c27b0",
						"#673ab7",
						"#3f51b5",
						"#2196f3",
						"#03a9f4",
						"#00bcd4",
						"#009688",
						"#4caf50",
						"#8bc34a",
						"#cddc39",
						"#ffeb3b",
						"#ffc107",
						"#ff9800",
						"#ff5722",
						"#795548",
						"#607d8b",
					]}
					onChange={(color) => {
						if (selected) setColor(selected, color.hex);
					}}
				/>
			)}
		</div>
	);
}
