import { Instance, Instances } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useMemo, useRef } from "react";
import { MathUtils, Mesh } from "three";

const BLOCK_COUNT = 50;

function Block() {
	const ref = useRef<Mesh>(null);

	const { width, height } = useThree((state) => state.viewport);

	const randScale = MathUtils.randFloat(0.75, 1);
	const scale = [1.6 * randScale, 0.9 * randScale, 1] as [
		number,
		number,
		number
	];
	const speed = MathUtils.randFloat(0.75, 1);

	const position = [
		MathUtils.randFloat(-width / 2, width / 2),
		MathUtils.randFloat(-width / 2, width / 2),
		-2,
	] as [number, number, number];

	useFrame(() => {
		if (ref.current) {
			ref.current.position.y += 0.05 * speed;

			if (ref.current.position.y > height / 1.5) {
				ref.current.position.y = -height;
			}
		}
	});

	return (
		<Instance
			ref={ref}
			scale={scale}
			position={position}
		/>
	);
}

export default function BackroundBlocks() {
	const blocks = useMemo(() => {
		return [...Array(BLOCK_COUNT)].map((_, idx) => {
			return <Block key={idx} />;
		});
	}, []);

	return (
		<Instances limit={BLOCK_COUNT}>
			<planeGeometry />
			<meshBasicMaterial
				color={"#e0e0e0"}
				toneMapped={false}
			/>
			{blocks}
		</Instances>
	);
}
