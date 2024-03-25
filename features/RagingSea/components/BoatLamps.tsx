import { Mesh, MeshStandardMaterial } from "three";

type Props = JSX.IntrinsicElements["group"] & {
	nodes: {
		Mesh159: Mesh;
		Mesh159_1: Mesh;
	};
	materials: {
		["Body 1"]: MeshStandardMaterial;
	};
};

export default function BoatLamps({ nodes, materials, ...rest }: Props) {
	return (
		<group {...rest}>
			<mesh geometry={nodes.Mesh159.geometry}>
				<meshStandardMaterial
					emissive={"yellow"}
					emissiveIntensity={2}
				/>
			</mesh>
			<mesh
				geometry={nodes.Mesh159_1.geometry}
				material={materials["Body 1"]}
			/>
		</group>
	);
}
