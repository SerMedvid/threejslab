import { Mesh, ShaderMaterial } from "three";
import useFollowPath from "../hooks/useFollowPath";
import { Float } from "@react-three/drei";

type Props = JSX.IntrinsicElements["group"] & {
	nodes: {
		Wisp: Mesh;
	};
	materials: {
		Wisp: ShaderMaterial;
	};
	knot?: JSX.IntrinsicElements["mesh"];
};

export default function Wisp({ nodes, materials, knot, ...rest }: Props) {
	return (
		<>
			<group {...rest}>
				<Float
					floatIntensity={2}
					rotationIntensity={3}
					speed={3}
				>
					<mesh
						geometry={nodes.Wisp.geometry}
						material={materials.Wisp}
						scale={0.197}
					>
						<pointLight
							power={50}
							color={"#EDFF85"}
						/>
					</mesh>
				</Float>
			</group>
		</>
	);
}
