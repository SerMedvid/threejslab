import { useRef } from "react";
import { BufferGeometry, Group, LineBasicMaterial, Vector3 } from "three";
import useStore from "../store/useStore";
import { Line, useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";
import { DEFAULT_DAMP_SPEED } from "../constants";

// const material = new LineBasicMaterial({ color: "white" });
// const geometry = new BufferGeometry().setFromPoints([
// 	new Vector3(0, -0.5, 0),
// 	new Vector3(0, 0.5, 0),
// ]);

export default function Minimap() {
	const ref = useRef<Group>(null);
	const imgNum = useStore((state) => state.imgNum);
	const { height } = useThree((state) => state.viewport);
	const scroll = useScroll();

	useFrame((_, delta) => {
		if (ref.current) {
			ref.current.children.forEach((child, index) => {
				const y = scroll.curve(index / imgNum - 1.5 / imgNum, 4 / imgNum);

				easing.damp(child.scale, "y", 1 + y, DEFAULT_DAMP_SPEED, delta);
			});
		}
	});

	return (
		<group
			ref={ref}
			scale={[0.1, 0.1, 1]}
			position-y={-height / 2 + 0.5}
		>
			{[...Array(imgNum)].map((_, idx) => (
				<Line
					key={idx}
					points={[0, -0.5, 0, 0, 0.5, 0]}
					color={"white"}
					position={[idx * 0.35, 0, 0]}
				/>
			))}
		</group>
	);
}
