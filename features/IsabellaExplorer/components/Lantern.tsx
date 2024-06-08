import { MeshTransmissionMaterial } from "@react-three/drei";
import React from "react";
import { Mesh, MeshStandardMaterial } from "three";
import FireParticles from "./FireParticles";
import { useControls } from "leva";

type Props = JSX.IntrinsicElements["group"] & {
	nodes: {
		Lantern_1: Mesh;
		Lantern_2: Mesh;
	};
	materials: {
		Lantern: MeshStandardMaterial;
		Glass: MeshStandardMaterial;
	};
};

export default function Lantern({ nodes, materials, ...rest }: Props) {
	return (
		<group {...rest}>
			<pointLight
				color={"#ff7d46"}
				distance={5}
				power={20}
				castShadow
			/>
			<mesh
				geometry={nodes.Lantern_1.geometry}
				material={materials.Lantern}
				castShadow
			/>
			<mesh geometry={nodes.Lantern_2.geometry}>
				<MeshTransmissionMaterial
					thickness={0.05}
					roughness={0.2}
					distortion={0.2}
				/>

				<group position-y={-0.32}>
					<FireParticles
						radius={0.05}
						height={0.2}
						particleCount={100}
					/>
				</group>
			</mesh>
		</group>
	);
}
