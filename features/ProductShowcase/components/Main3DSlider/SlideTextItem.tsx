import React, { useEffect, useRef } from "react";
import { Text } from "@react-three/drei";
import { Mesh, MeshBasicMaterial } from "three";
import useStore from "../../stores/useStore";
import gsap from "gsap";

type Props = {
	idx: number;
	text: string;
	material: MeshBasicMaterial;
};

export default function SlideTextItem({ idx, text, material }: Props) {
	const ref = useRef<Mesh>(null);

	useEffect(() => {
		const unsubscribe = useStore.subscribe(
			(state) => ({
				slide: state.slide,
				totalSlides: state.totalSlides,
				interacted: state.interacted,
			}),
			({ slide, totalSlides, interacted }) => {
				if (ref.current) {
					if ((slide + 1) % totalSlides === idx) {
						gsap.set(ref.current.position, {
							x: 1.6,
						});
					} else {
						gsap.to(ref.current.position, {
							x:
								(idx - slide === totalSlides - 1 && interacted
									? -totalSlides + 1
									: idx - slide) * 1.6,
							duration: 1.2,
							ease: "power2.inOut",
						});
					}
				}
			}
		);

		return () => {
			unsubscribe();
		};
	}, [idx]);

	return (
		<Text
			ref={ref}
			position-x={1.5 * idx}
			key={text}
			textAlign="center"
			fontWeight={900}
			fontSize={0.5}
			maxWidth={1.5}
			lineHeight={0.9}
			material={material}
		>
			{text}
		</Text>
	);
}
