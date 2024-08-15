import {
	CameraControls,
	Environment,
	OrbitControls,
	PerspectiveCamera,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { Mesh, MeshBasicMaterial } from "three";

type Props = {
	renderTarget: "mask" | "final";
};

import MainSlider from "./MainSlider";

export default function RenderScene({ renderTarget }: Props) {
	const scene = useThree((state) => state.scene);
	const { width } = useThree((state) => state.size);

	const [basicMat] = useState(
		() => new MeshBasicMaterial({ color: "#ff0000" })
	);

	useEffect(() => {
		if (renderTarget === "mask") {
			scene.traverse((child) => {
				if (child instanceof Mesh) {
					if (child.userData.isBlurred) {
						child.material = basicMat;
					} else {
						child.visible = false;
					}
				}
			});
		}
	}, [renderTarget, scene, basicMat]);

	const isMobile = width < 768;

	return (
		<>
			<CameraControls enabled={false}>
				<PerspectiveCamera
					makeDefault
					position={[isMobile ? 1 : 0, 1, isMobile ? 12 : 7]}
				/>
			</CameraControls>

			{renderTarget !== "mask" && <Environment preset="apartment" />}

			{renderTarget === "mask" && (
				<color
					attach="background"
					args={["#000000"]}
				/>
			)}

			<MainSlider />
		</>
	);
}
