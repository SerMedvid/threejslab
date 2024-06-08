import { useHelper } from "@react-three/drei";
import React, { useRef } from "react";
import { Mesh, MeshStandardMaterial, PointLightHelper } from "three";

type Props = {
	nodes: {
		Branch_1: Mesh;
		Branch_2: Mesh;
		Text002: Mesh;
	};
	materials: {
		"Wood.001": MeshStandardMaterial;
		Leaf: MeshStandardMaterial;
		Text: MeshStandardMaterial;
	};
};

export default function Title({ nodes, materials }: Props) {
	return (
		<>
			<group
				position={[-2.515, 1.079, 0.014]}
				rotation={[0, 0.487, 0]}
				scale={0.91}
			>
				<mesh
					geometry={nodes.Branch_1.geometry}
					material={materials["Wood.001"]}
				/>
				<mesh
					geometry={nodes.Branch_2.geometry}
					material={materials.Leaf}
				/>
			</group>
			<mesh
				geometry={nodes.Text002.geometry}
				material={materials.Text}
				position={[-2.665, 1.695, -0.081]}
				rotation={[-Math.PI, -0.487, 0]}
				scale={0.91}
			/>

			<pointLight
				position={[-2.665, 3.5, 1.5]}
				intensity={10}
			/>
		</>
	);
}
