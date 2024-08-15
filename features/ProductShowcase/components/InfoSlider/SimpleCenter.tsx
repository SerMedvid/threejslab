import {
	Bounds,
	Center,
	Environment,
	PerspectiveCamera,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group } from "three";

type Props = {
	children: React.ReactNode;
};

export default function SimpleCenter({ children }: Props) {
	const ref = useRef<Group>(null);

	useFrame((_, delta) => {
		if (ref.current) {
			ref.current.rotation.y += delta * 0.1;
		}
	});

	return (
		<>
			<Environment preset="apartment" />
			<PerspectiveCamera
				fov={55}
				makeDefault
				position={[0, 1, 2]}
			/>

			<Bounds
				fit
				margin={2}
			>
				<group ref={ref}>
					<Center>{children}</Center>
				</group>
			</Bounds>
		</>
	);
}
