import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useFrame } from "@react-three/fiber";
import { Group } from "three";

type GLTFResult = GLTF & {
	nodes: {
		PUSHILIN_Plane_Circle000: THREE.Mesh;
		PUSHILIN_Plane_Helix: THREE.Mesh;
	};
	materials: {
		plane: THREE.MeshStandardMaterial;
	};
};

type ContextType = Record<
	string,
	React.ForwardRefExoticComponent<JSX.IntrinsicElements["mesh"]>
>;

const HELIX_SPEED = 6;

export const Airplane = React.forwardRef<Group, JSX.IntrinsicElements["group"]>(
	(props, ref) => {
		const { nodes, materials } = useGLTF(
			"/assets/ScrollPlane/airplane.glb"
		) as GLTFResult;

		const helixRef = useRef<THREE.Mesh>(null);

		useFrame((state, delta) => {
			if (helixRef.current) {
				helixRef.current.rotation.x += delta * HELIX_SPEED;
			}
		});

		return (
			<group
				{...props}
				dispose={null}
				ref={ref}
			>
				<mesh geometry={nodes.PUSHILIN_Plane_Circle000.geometry}>
					<meshStandardMaterial color={"white"} />
				</mesh>
				<mesh
					ref={helixRef}
					geometry={nodes.PUSHILIN_Plane_Helix.geometry}
					position={[1.09, 0.23, 0]}
				>
					<meshStandardMaterial color={"white"} />
				</mesh>
			</group>
		);
	}
);

Airplane.displayName = "Airplane";

useGLTF.preload("/assets/ScrollPlane/airplane.glb");

export default Airplane;
