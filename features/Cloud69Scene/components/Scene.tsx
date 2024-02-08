import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import { Mesh } from "three";

export default function Scene() {
	const { scene } = useGLTF("/assets/Cloud69Scene/cloud69.glb");

	useEffect(() => {
		scene.traverse((child) => {
			if (child instanceof Mesh) {
				child.receiveShadow = true;
				child.castShadow = true;
			}
		});
	}, [scene]);

	return <primitive object={scene} />;
}
