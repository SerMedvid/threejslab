import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group, Mesh } from "three";

type Props = JSX.IntrinsicElements["group"] & {
	nodes: {
		DeathStar: Mesh;
	};
	material: React.ReactNode;
};

export default function DeathStar({ nodes, material, ...rest }: Props) {
	const groupRef = useRef<Group>(null);

	useFrame((_, delta) => {
		if (groupRef.current) {
			groupRef.current.rotation.y += delta * 0.05;
		}
	});

	return (
		<group
			{...rest}
			ref={groupRef}
		>
			<mesh geometry={nodes.DeathStar.geometry}>{material}</mesh>
		</group>
	);
}
