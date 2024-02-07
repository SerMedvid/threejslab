import { useThree } from "@react-three/fiber";
import TextItem from "./TextItem";

type Props = {
	texts: string[];
	lineHeight?: number;
	onlyCurrent?: boolean;
};

export default function Texts({
	texts,
	lineHeight = 1,
	onlyCurrent = false,
}: Props) {
	const { height, width } = useThree((state) => state.viewport);
	const textSet = [...texts, ...texts, ...texts];
	const orderIndexSize = `0${texts.length}`.length;

	return (
		<group
			position-y={height * 1.75}
			position-x={-width / 2.5}
		>
			{textSet.map((text, idx) => (
				<TextItem
					key={idx}
					idx={idx}
					orderIdx={((idx % texts.length) + 1)
						.toString()
						.padStart(orderIndexSize, "0")}
					lineHeight={lineHeight}
					onlyCurrent={onlyCurrent}
				>
					{text}
				</TextItem>
			))}
		</group>
	);
}
