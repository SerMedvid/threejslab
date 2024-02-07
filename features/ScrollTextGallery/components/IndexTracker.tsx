import { useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

type Props = {
	lineHeight: number;
	pageMultiplier: number;
};

import { list } from "../data";
import useStore from "../store/useStore";

export default function IndexTracker({ lineHeight, pageMultiplier }: Props) {
	const scroll = useScroll();
	const height = useThree((state) => state.viewport.height);

	const setCurrentIndex = useStore((state) => state.setCurrentIndex);
	const setCurrentIndexOffset = useStore(
		(state) => state.setCurrentIndexOffset
	);

	useFrame(() => {
		const currentIndexOffset =
			(((scroll.pages * height) / lineHeight) * scroll.offset) /
				pageMultiplier +
			height / 2;

		const currentIndex =
			Math.floor(currentIndexOffset + lineHeight / 20) % list.length;

		setCurrentIndex(currentIndex);
		setCurrentIndexOffset(currentIndexOffset);
	});

	return null;
}
