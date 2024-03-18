import { useRef } from "react";
import { Mesh, PointLight, Color } from "three";

type Props = JSX.IntrinsicElements["group"] & {
	nodes: {
		LampBolb: Mesh;
	};
};

const streetLightColor = new Color("#e47025").multiplyScalar(5);

export default function StreetLight({ nodes, ...rest }: Props) {
	const bolbRef = useRef<Mesh>(null);
	const lightRef = useRef<PointLight>(null);

	return (
		<group {...rest}>
			<mesh
				geometry={nodes.LampBolb.geometry}
				ref={bolbRef}
			>
				<meshBasicMaterial color={streetLightColor} />
			</mesh>

			<pointLight
				ref={lightRef}
				color={"#e47025"}
				power={450}
			/>
		</group>
	);
}
