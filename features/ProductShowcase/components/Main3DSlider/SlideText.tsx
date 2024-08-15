import { Mask, useMask } from "@react-three/drei";
import React, { useMemo } from "react";
import { MeshBasicMaterial } from "three";
import SlideTextItem from "./SlideTextItem";

const texts = ["Sofa cake", "Blob sofa", "Herb pods"];

export default function SlideText() {
	const stencil = useMask(1);

	const textMaterial = useMemo(() => {
		return new MeshBasicMaterial({ ...stencil });
	}, [stencil]);

	return (
		<>
			<group position={[0, 0, 0.5]}>
				<Mask id={1}>
					<planeGeometry args={[1.4, 1.5]} />
				</Mask>
			</group>

			{texts.map((text, idx) => (
				<SlideTextItem
					key={text}
					idx={idx}
					text={text}
					material={textMaterial}
				/>
			))}
		</>
	);
}
