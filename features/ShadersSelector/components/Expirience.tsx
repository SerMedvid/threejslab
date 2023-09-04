"use client";

import { Center, OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { DoubleSide, Mesh } from "three";

type Props = {
	vertex: string;
	fragment: string;
};

export default function Expirience({ vertex, fragment }: Props) {
	const meshRef = useRef<Mesh>(null);

	return (
		<>
			<OrbitControls />

			<Center>
				<mesh
					ref={meshRef}
					key={`${vertex}+${fragment}`}
				>
					<planeGeometry />
					<shaderMaterial
						side={DoubleSide}
						vertexShader={vertex}
						fragmentShader={fragment}
					/>
				</mesh>
			</Center>
		</>
	);
}
