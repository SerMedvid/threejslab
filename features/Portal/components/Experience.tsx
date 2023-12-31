"use client";

import {
	OrbitControls,
	Sparkles,
	useGLTF,
	useTexture,
} from "@react-three/drei";
import { useControls } from "leva";
import { useEffect, useRef } from "react";
import {
	Color,
	Mesh,
	MeshBasicMaterial,
	SRGBColorSpace,
	ShaderMaterial,
	Texture,
} from "three";

import vertexShader from "../shaders/vertex.glsl";
import fragmentShader from "../shaders/fragment.glsl";
import { useFrame } from "@react-three/fiber";

const DEFAULT_PORTAL_COLOR_A = "#ffffff";
const DEFAULT_PORTAL_COLOR_B = "#2276ba";

export default function Experience() {
	const model = useGLTF("/assets/Portal/portal3js.glb");
	const portalMaterialRef = useRef<ShaderMaterial>();
	const { baked } = useTexture(
		{ baked: "/assets/Portal/texture.jpg" },
		(textures) => {
			if (Array.isArray(textures) && textures[0] instanceof Texture) {
				const texture = textures[0];
				texture.flipY = false;
				texture.colorSpace = SRGBColorSpace;
			}
		}
	);

	const { background, portalColorA, portalColorB } = useControls("General", {
		background: "#201919",
		portalColorA: DEFAULT_PORTAL_COLOR_A,
		portalColorB: DEFAULT_PORTAL_COLOR_B,
	});

	useFrame((state) => {
		if (portalMaterialRef.current) {
			portalMaterialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
		}
	});

	useEffect(() => {
		const bakedMaterial = new MeshBasicMaterial({
			map: baked,
			transparent: false,
		});

		const poleLightMaterial = new MeshBasicMaterial({
			color: 0xffffe5,
		});
		const portalLightMaterial = new ShaderMaterial({
			vertexShader,
			fragmentShader,
			uniforms: {
				uTime: {
					value: 0,
				},
				uColorA: {
					value: new Color(DEFAULT_PORTAL_COLOR_A),
				},
				uColorB: {
					value: new Color(DEFAULT_PORTAL_COLOR_B),
				},
			},
		});
		portalMaterialRef.current = portalLightMaterial;

		model.scene.traverse((child) => {
			if (!(child instanceof Mesh)) {
				return;
			}

			if (child.name.match(/^poleLight/)) {
				child.material = poleLightMaterial;
			} else if (child.name === "portalLight") {
				child.material = portalLightMaterial;
			} else {
				child.material = bakedMaterial;
			}
		});
	}, [model.scene, baked]);

	useEffect(() => {
		if (portalMaterialRef.current) {
			portalMaterialRef.current.uniforms.uColorA.value.set(portalColorA);
			portalMaterialRef.current.uniforms.uColorB.value.set(portalColorB);
		}
	}, [portalColorA, portalColorB]);

	return (
		<>
			<color
				args={[background]}
				attach={"background"}
			/>
			<OrbitControls
				minAzimuthAngle={-Math.PI / 2}
				maxAzimuthAngle={Math.PI / 2}
				minPolarAngle={0}
				maxPolarAngle={Math.PI / 2 - 0.1}
				enableDamping
				dampingFactor={0.03}
			/>
			<primitive object={model.scene} />

			<Sparkles
				position-y={1}
				count={30}
				size={3}
				scale={[4, 1, 4]}
			/>
		</>
	);
}

useGLTF.preload("/assets/Portal/portal3js.glb");
useTexture.preload("/assets/Portal/texture.jpg");
