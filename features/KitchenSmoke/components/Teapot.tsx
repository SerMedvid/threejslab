import { Mesh, MeshStandardMaterial } from "three";
import Smoke from "./Smoke";

type Props = JSX.IntrinsicElements["group"] & {
	nodes: {
		Teapot: Mesh;
		TeapotHandle: Mesh;
		Lid_1: Mesh;
		Lid_2: Mesh;
	};
	materials: {
		Gray: MeshStandardMaterial;
		Steel: MeshStandardMaterial;
		Black: MeshStandardMaterial;
	};
};

export default function Teapot({ nodes, materials, ...rest }: Props) {
	return (
		<group {...rest}>
			<mesh
				geometry={nodes.Teapot.geometry}
				material={materials.Gray}
				scale={0.183}
				castShadow
			>
				<mesh
					geometry={nodes.TeapotHandle.geometry}
					material={materials.Steel}
					position={[0.003, 1.042, 0.004]}
					rotation={[0, 0, -Math.PI / 2]}
					scale={0.708}
					castShadow
				/>
				<mesh
					geometry={nodes.Lid_1.geometry}
					material={materials.Gray}
					castShadow
				/>
				<mesh
					geometry={nodes.Lid_2.geometry}
					material={materials.Black}
				/>

				<Smoke
					scale={[0.075, 0.4, 0.075]}
					rotation-x={Math.PI / 3.1}
					position={[0, 0.75, 1.2]}
					speed={20}
					rotationSpeed={0.8}
					density={0.7}
				/>
			</mesh>
		</group>
	);
}
