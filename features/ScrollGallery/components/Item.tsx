import { Image, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { ComponentProps, ComponentRef, useRef, useState } from "react";
import { easing } from "maath";
import useStore from "../store/useStore";
import { Material, ShaderMaterial } from "three";
import { DEFAULT_DAMP_SPEED } from "../constants";

type Props = ComponentProps<typeof Image> & {
	index: number;
	scale: [number, number];
	position: [number, number, number];
};

export default function Item({ index, position, scale, ...props }: Props) {
	const ref = useRef<ComponentRef<typeof Image>>(null);
	const scroll = useScroll();
	const setClicked = useStore((state) => state.setClicked);
	const clicked = useStore((state) => state.clicked);
	const imgNum = useStore((state) => state.imgNum);
	const [hovered, setHovered] = useState(false);

	useFrame((_, delta) => {
		if (ref.current) {
			const y = scroll.curve(index / imgNum - 1.5 / imgNum, 4 / imgNum);

			if (ref.current.material instanceof ShaderMaterial) {
				ref.current.material.uniforms.scale.value = [
					ref.current.scale.x,
					ref.current.scale.y,
				];

				easing.damp(
					ref.current.material,
					"grayscale",
					hovered || clicked === index ? 0 : Math.max(0, 1 - y),
					DEFAULT_DAMP_SPEED,
					delta
				);

				easing.dampC(
					ref.current.material.uniforms.color.value,
					hovered || clicked === index ? "white" : "#aaa",
					hovered ? 0.3 : 0.15,
					DEFAULT_DAMP_SPEED,
					delta
				);
			}

			easing.damp3(
				ref.current.scale,
				[
					clicked === index ? 4.7 : scale[0],
					clicked === index ? 5 : scale[1] + y,
					1,
				],
				DEFAULT_DAMP_SPEED,
				delta
			);

			let xOffset = 0;

			if (clicked !== null) {
				if (index < clicked) {
					xOffset = -2;
				} else if (index > clicked) {
					xOffset = 2;
				}
			}

			easing.damp(
				ref.current.position,
				"x",
				position[0] + xOffset,
				DEFAULT_DAMP_SPEED,
				delta
			);
		}
	});

	const onClick = () => {
		setClicked(clicked === index ? null : index);
	};

	return (
		// eslint-disable-next-line jsx-a11y/alt-text
		<Image
			onClick={onClick}
			onPointerEnter={() => setHovered(true)}
			onPointerLeave={() => setHovered(false)}
			ref={ref}
			position={position}
			scale={scale}
			{...props}
		/>
	);
}
