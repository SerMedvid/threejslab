import { Text } from "@react-three/drei";
import { useInterval } from "ahooks";
import React, { ComponentProps, ElementRef, forwardRef, useState } from "react";
import { Color } from "three";

type Props = {
	width: number;
	height: number;
} & Omit<ComponentProps<typeof Text>, "children">;

const DEFAULT_COLOR = new Color(0.33, 0.33, 0.33);
const HIGHLIGHTED_COLOR = new Color(1, 1, 1).multiplyScalar(20);

function generateString(length: number) {
	let text = "";
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789&?#@";
	const charactersLength = characters.length;
	let counter = 0;
	const colorRanges: Record<number, Color> = {
		0: DEFAULT_COLOR,
	};

	while (counter < length) {
		if (Math.random() > 0.95) {
			colorRanges[counter * 2] = HIGHLIGHTED_COLOR;
			colorRanges[counter * 2 + 1] = DEFAULT_COLOR;
		}

		text +=
			characters.charAt(Math.floor(Math.random() * charactersLength)) + " ";
		counter += 1;
	}

	return { text, colorRanges };
}

const DEFAULT_LINE_HEIGHT = 2;
const DEFAULT_ROW_NUMBER = 22;

const TextCardItem = forwardRef<ElementRef<typeof Text>, Props>(
	({ width, height, ...rest }, ref) => {
		const fontSize = height / DEFAULT_ROW_NUMBER;
		const totalNumber =
			Math.floor(width / fontSize) * (DEFAULT_ROW_NUMBER / DEFAULT_LINE_HEIGHT);

		const [text, setText] = useState(generateString(totalNumber).text);
		const [colorRanges, setClorRanges] = useState(
			generateString(totalNumber).colorRanges
		);

		useInterval(() => {
			const { text, colorRanges } = generateString(totalNumber);
			setText(text);
			setClorRanges(colorRanges);
		}, 400);

		return (
			<Text
				ref={ref}
				font="/fonts/RobotoMono.ttf"
				color={0x333333}
				maxWidth={width}
				lineHeight={DEFAULT_LINE_HEIGHT}
				fontSize={fontSize}
				anchorY={-height / 2}
				clipRect={[-width / 2, -height / 2, width / 2, height / 2]}
				// @ts-ignore
				colorRanges={colorRanges}
				{...rest}
			>
				{text}
			</Text>
		);
	}
);

TextCardItem.displayName = "TextCardItem";

export default TextCardItem;
