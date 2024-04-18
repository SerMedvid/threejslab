import React, { useRef } from "react";
import { Mesh, MeshStandardMaterial, SpotLight } from "three";

type Props = JSX.IntrinsicElements["group"] & {
	nodes: {
		StreetLight002: Mesh;
	};
	materials: {
		FoodEnvBaked: MeshStandardMaterial;
	};
	withLight?: boolean;
};

export default function StreetLight({
	nodes,
	materials,
	withLight,
	...rest
}: Props) {
	const spotLightRef = useRef<SpotLight>(null);

	return (
		<group {...rest}>
			<mesh
				geometry={nodes.StreetLight002.geometry}
				material={materials.FoodEnvBaked}
			/>

			{withLight && (
				<group>
					<spotLight
						ref={spotLightRef}
						position={[1.29, 12, 1.75]}
						angle={0.65}
						distance={15}
						intensity={1200}
						penumbra={1}
						color={"#fff5b6"}
					/>
				</group>
			)}
		</group>
	);
}
