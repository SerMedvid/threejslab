import * as THREE from "three";
import React, { RefObject, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { fadeOnBeforeCompile } from "../utils/fadeMaterial";
import { useFrame } from "@react-three/fiber";

type GLTFResult = GLTF & {
	nodes: {
		Mball001: THREE.Mesh;
	};
	materials: {
		Material: THREE.MeshStandardMaterial;
	};
};

type Props = JSX.IntrinsicElements["group"] & {
	opacity?: number;
	sceneOpacity?: RefObject<number>;
};

export default function Cloud(props: Props) {
	const { nodes, materials } = useGLTF(
		"/assets/ScrollPlane/cloud.gltf"
	) as GLTFResult;

	const { opacity = 1, sceneOpacity, ...restProps } = props;

	const materialRef = useRef<THREE.MeshStandardMaterial>(null);

	useFrame(() => {
		if (materialRef.current) {
			materialRef.current.opacity = sceneOpacity?.current || 0;
		}
	});

	return (
		<group
			{...restProps}
			dispose={null}
		>
			<mesh geometry={nodes.Mball001.geometry}>
				<meshStandardMaterial
					onBeforeCompile={fadeOnBeforeCompile}
					transparent
					ref={materialRef}
					envMapIntensity={2}
				/>
			</mesh>
		</group>
	);
}

useGLTF.preload("/assets/ScrollPlane/cloud.gltf");
