import { useFrame } from "@react-three/fiber";
import { ReactNode, useRef } from "react";
import { Group } from "three";

type Props = {
	children: ReactNode;
	firstElementOffset: number;
	totalOffset: number;
};

export default function SliderGroup({
	children,
	firstElementOffset,
	totalOffset,
}: Props) {
	const sliderRef = useRef<Group>(null);

	useFrame((_, delta) => {
		if (sliderRef.current) {
			if (sliderRef.current.position.x > -firstElementOffset) {
				sliderRef.current.position.x = -totalOffset;
			}

			sliderRef.current.position.x += delta * 2;
		}
	});

	return (
		<group
			ref={sliderRef}
			position-x={-totalOffset - 2}
		>
			{children}
		</group>
	);
}
