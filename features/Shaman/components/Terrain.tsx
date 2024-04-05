import { Mesh, MeshStandardMaterial } from "three";
import Grass from "./Grass";
import { useEffect, useState } from "react";

type Props = JSX.IntrinsicElements["group"] & {
	nodes: {
		Land_1: Mesh;
		Land_2: Mesh;
		Land_3: Mesh;
		Water: Mesh;
	};
	materials: {
		Sand: MeshStandardMaterial;
		Grass: MeshStandardMaterial;
		Branches: MeshStandardMaterial;
		Water: MeshStandardMaterial;
	};
};

export default function Terrain({ nodes, materials }: Props) {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		setVisible(true);
	}, []);

	return (
		<>
			<mesh
				geometry={nodes.Water.geometry}
				material={materials.Water}
				position={[2.896, -0.518, -2.677]}
			></mesh>
			<group>
				<mesh
					geometry={nodes.Land_1.geometry}
					material={materials.Sand}
					receiveShadow
				/>

				<mesh
					geometry={nodes.Land_2.geometry}
					receiveShadow
					name="GRASS"
				>
					<meshBasicMaterial color={"#000f00"} />
				</mesh>

				<mesh
					geometry={nodes.Land_3.geometry}
					material={materials.Branches}
				/>

				{visible && <Grass />}
			</group>
		</>
	);
}
