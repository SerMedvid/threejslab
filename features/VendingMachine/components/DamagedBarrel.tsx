import React, { useRef } from "react";
import {
	Mesh,
	MeshStandardMaterial,
	PointLight,
	PointLightHelper,
} from "three";
import { useHelper } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import FireParticles from "./FireParticles";

type Props = JSX.IntrinsicElements["group"] & {
	nodes: {
		BarrelDamaged001: Mesh;
	};
	materials: {
		FoodEnvBaked: MeshStandardMaterial;
	};
};

export default function DamagedBarrel({ nodes, materials, ...rest }: Props) {
	const lightRef = useRef<PointLight>(null);

	useFrame(({ clock }) => {
		if (lightRef.current) {
			lightRef.current.intensity =
				1200 + Math.sin(clock.elapsedTime * 0.5) * 400 + Math.random() * 400;
		}
	});

	return (
		<group {...rest}>
			<mesh
				geometry={nodes.BarrelDamaged001.geometry}
				material={materials.FoodEnvBaked}
				castShadow
			/>

			<group position-y={2}>
				<FireParticles
					radius={0.95}
					height={3}
					particleCount={1000}
				/>
			</group>

			<pointLight
				ref={lightRef}
				position-y={3.75}
				color={"#AA4203"}
				castShadow
			/>
		</group>
	);
}
