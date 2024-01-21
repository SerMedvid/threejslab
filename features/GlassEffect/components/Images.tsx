/* eslint-disable jsx-a11y/alt-text */
import { useFrame, useThree } from "@react-three/fiber";
import { Image, useScroll } from "@react-three/drei";
import React, { useRef } from "react";
import { Group, Mesh } from "three";

const rangeData = [
	[0, 1 / 3, 3],
	[0, 1 / 3, 3],
	[1.15 / 3, 1 / 3, 2],
	[1.15 / 3, 1 / 3, 2],
	[1.15 / 3, 1 / 3, 2],
	[1.6 / 3, 1 / 3, 1],
	[2 / 3, 1 / 3, 3],
];

export default function Images() {
	const ref = useRef<Group>(null);
	const { width, height } = useThree((state) => state.viewport);
	const scroll = useScroll();

	useFrame(() => {
		if (!ref.current) return;

		ref.current.children.forEach((item, idx) => {
			if (item instanceof Mesh && rangeData?.[idx]) {
				if (idx === 5) {
					item.material.grayscale =
						1 - scroll.range(rangeData[idx][0], rangeData[idx][1]);
				} else if (idx === 6) {
					item.material.zoom =
						1 +
						(1 - scroll.range(rangeData[idx][0], rangeData[idx][1])) /
							rangeData[idx][2];
				} else {
					item.material.zoom =
						1 +
						scroll.range(rangeData[idx][0], rangeData[idx][1]) /
							rangeData[idx][2];
				}
			}
		});
	});

	return (
		<group ref={ref}>
			<Image
				position={[-2, 0, 0]}
				scale={[4, height]}
				url={"/assets/FurnitureGallery/1.jpg"}
			/>
			<Image
				position={[2, 0, 3]}
				scale={3}
				url={"/assets/FurnitureGallery/2.jpg"}
			/>
			<Image
				position={[-2.05, -height, 6]}
				scale={[2, 3]}
				url={"/assets/FurnitureGallery/6.jpg"}
			/>
			<Image
				position={[-0.6, -height, 9]}
				scale={[1, 2]}
				url={"/assets/FurnitureGallery/4.jpg"}
			/>
			<Image
				position={[0.75, -height, 10.5]}
				scale={1.5}
				url={"/assets/FurnitureGallery/5.jpg"}
			/>
			<Image
				position={[0, -height * 1.5, 7.5]}
				scale={[1.5, 3]}
				url={"/assets/FurnitureGallery/3.jpg"}
			/>
			<Image
				position={[0, -height * 2 - height / 4, 0]}
				scale={[width, height / 1.1]}
				url={"/assets/FurnitureGallery/7.jpg"}
			/>
		</group>
	);
}
