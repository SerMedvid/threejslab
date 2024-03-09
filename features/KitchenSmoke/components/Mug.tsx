import { Mesh, MeshStandardMaterial } from "three";
import Smoke from "./Smoke";

type Props = JSX.IntrinsicElements["group"] & {
	nodes: {
		Mug: Mesh;
		Coffee: Mesh;
	};
	materials: {
		Mug: MeshStandardMaterial;
		Coffee: MeshStandardMaterial;
	};
};

export default function Mug({ nodes, materials, ...rest }: Props) {
	return (
		<group {...rest}>
			<mesh
				geometry={nodes.Mug.geometry}
				material={materials.Mug}
				castShadow
			>
				<group rotation={[0, -1.167, 0]}>
					<mesh
						geometry={nodes.Coffee.geometry}
						receiveShadow
					>
						<meshBasicMaterial {...materials.Coffee} />
					</mesh>
					<Smoke
						scale={[0.075, 0.18, 0.075]}
						position-y={0.25}
						rotationSpeed={0.05}
						color={[0.92, 0.6, 0.5]}
					/>
				</group>
			</mesh>
		</group>
	);
}
