import { Scroll, ScrollControls } from "@react-three/drei";
import useStore from "../store/useStore";
import { useThree } from "@react-three/fiber";
import Item from "./Item";
import Minimap from "./Minimap";

type Props = {
	width?: number;
	gap?: number;
};

export default function Experience({ width: w = 0.7, gap = 0.15 }: Props) {
	const imgs = useStore((state) => state.imgs);
	const imgNum = useStore((state) => state.imgNum);
	const { width } = useThree((state) => state.viewport);

	const xW = w + gap;

	return (
		<>
			<ScrollControls
				horizontal
				damping={0.1}
				pages={(width - xW + imgNum * xW) / width}
			>
				<Minimap />

				<Scroll>
					{imgs.map((url, idx) => (
						<Item
							key={idx}
							index={idx}
							position={[idx * xW, 0, 0]}
							scale={[w, 4]}
							url={url}
						/>
					))}
				</Scroll>
			</ScrollControls>
		</>
	);
}
