import { Mesh, MeshStandardMaterial } from "three";
import Smoke from "./Smoke";

type Props = JSX.IntrinsicElements["group"] & {
	nodes: {
		Chimney001: Mesh;
	};
	materials: {
		VM_Baked: MeshStandardMaterial;
	};
};

export default function Chimney({ nodes, materials, ...rest }: Props) {
	return (
		<group {...rest}>
			<mesh
				geometry={nodes.Chimney001.geometry}
				material={materials.VM_Baked}
			/>
			<Smoke
				scale={[0.3, 0.5, 0.3]}
				position-y={0.55}
				speed={20}
				rotationSpeed={0.5}
				density={0.55}
			/>
		</group>
	);
}
