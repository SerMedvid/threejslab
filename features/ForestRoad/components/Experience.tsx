"use client";

import { OrbitControls, useGLTF, useTexture } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { Group, Mesh, MeshBasicMaterial, SRGBColorSpace, Texture } from "three";

export default function Experience() {
	const modelRef = useRef<Group>(null);
	const model = useGLTF("/assets/ForestRoad/forest_road3js.glb");
	const { baked } = useTexture(
		{ baked: "/assets/ForestRoad/forestroad-baked.jpg" },
		(loadedTextures) => {
			if (
				Array.isArray(loadedTextures) &&
				loadedTextures[0] instanceof Texture
			) {
				const bakedTexture = loadedTextures[0];
				bakedTexture.flipY = false;
				bakedTexture.colorSpace = SRGBColorSpace;
			}
		}
	);

	useEffect(() => {
		if (modelRef.current) {
			const material = new MeshBasicMaterial({
				map: baked,
			});

			modelRef.current.traverse((child) => {
				if (child instanceof Mesh) {
					child.material = material;
				}
			});
		}
	}, [baked]);

	return (
		<>
			<OrbitControls maxPolarAngle={Math.PI / 2} />
			<primitive
				ref={modelRef}
				object={model.scene}
			/>
		</>
	);
}

useGLTF.preload("/assets/ForestRoad/forest_road3js.glb");
useTexture.preload("/assets/ForestRoad/forestroad-baked.jpg");
