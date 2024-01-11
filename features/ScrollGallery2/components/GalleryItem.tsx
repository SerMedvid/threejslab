import { Image, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { ComponentProps, ElementRef, useRef } from "react";

type Props = ComponentProps<typeof Image> & {
	position: [number, number, number];
};

export default function GalleryItem(props: Props) {
	const ref = useRef<ElementRef<typeof Image>>(null);

	const scroll = useScroll();
	const { position } = props;
	const originalZ = position?.[2] || 0;

	useFrame((_, delta) => {
		if (!ref.current) {
			return;
		}

		easing.damp(
			ref.current.position,
			"z",
			Math.max(originalZ, originalZ + scroll.delta * 50),
			0.3,
			delta
		);

		easing.damp(
			ref.current.material,
			"grayscale",
			Math.max(0, 1 - scroll.delta * 1000),
			0.1,
			delta
		);
	});

	return (
		// eslint-disable-next-line jsx-a11y/alt-text
		<Image
			ref={ref}
			grayscale={1}
			{...props}
		/>
	);
}
