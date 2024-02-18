import { VisualData } from "./Slider";
import TextCardItem from "./TextCardItem";

type Props = {
	items: VisualData[];
};

export default function SliderText({ items }: Props) {
	return (
		<group>
			{items.map(({ width, height, offset }, idx) => (
				<TextCardItem
					name={`${idx}`}
					key={idx}
					width={width}
					height={height}
					position-x={offset}
				/>
			))}
		</group>
	);
}
