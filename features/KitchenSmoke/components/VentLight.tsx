import { useRef } from "react";
import { Mesh, MeshStandardMaterial, RectAreaLight } from "three";

type Props = JSX.IntrinsicElements["group"] & {
	nodes: {
		VentLight: Mesh;
	};
	materials: {
		White: MeshStandardMaterial;
	};
};

export default function VentLight({ nodes, materials, ...rest }: Props) {
	const lightRef = useRef<RectAreaLight>(null);

	return (
		<group {...rest}>
			<rectAreaLight
				rotation-x={-Math.PI / 2}
				position-y={-0.01}
				ref={lightRef}
				color="#ffff00"
				width={0.2}
				height={1.5}
				intensity={30}
			/>
			<mesh geometry={nodes.VentLight.geometry}>
				<meshStandardMaterial
					{...materials.White}
					emissiveIntensity={2}
					emissive={"#ffff00"}
				/>
			</mesh>
		</group>
	);
}
