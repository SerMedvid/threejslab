import { Mesh, MeshStandardMaterial } from "three";
import Smoke from "./Smoke";

type Props = JSX.IntrinsicElements["group"] & {
	nodes: {
		Egg_1: Mesh;
		Egg_2: Mesh;
	};
	materials: {
		EggWhite: MeshStandardMaterial;
		EggYellow: MeshStandardMaterial;
	};
};

export default function Eggs({ nodes, materials, ...rest }: Props) {
	return (
		<group {...rest}>
			<mesh
				geometry={nodes.Egg_1.geometry}
				material={materials.EggWhite}
				castShadow
			/>
			<mesh
				geometry={nodes.Egg_2.geometry}
				material={materials.EggYellow}
				castShadow
			/>

			<Smoke
				scale={[0.15, 0.3, 0.15]}
				density={0.5}
			/>
		</group>
	);
}
