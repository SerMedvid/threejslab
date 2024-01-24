/* eslint-disable jsx-a11y/alt-text */
import { Image } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { ComponentProps, ElementRef, useRef } from "react";

type Props = ComponentProps<typeof Image>;

export default function ImageTile(props: Props) {
	const ref = useRef<ElementRef<typeof Image>>(null);
	const isHoveredRef = useRef(false);

	useFrame((_, delta) => {
		if (ref.current) {
			easing.damp(
				ref.current.material,
				"grayscale",
				isHoveredRef.current ? 0 : 1,
				0.3,
				delta
			);
		}
	});

	return (
		<Image
			onPointerEnter={() => (isHoveredRef.current = true)}
			onPointerLeave={() => (isHoveredRef.current = false)}
			ref={ref}
			{...props}
			grayscale={1}
		/>
	);
}
