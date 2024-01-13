import {
	Environment,
	OrbitControls,
	useGLTF,
	useTexture,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import {
	Group,
	Mesh,
	MeshBasicMaterial,
	SRGBColorSpace,
	ShaderMaterial,
	Texture,
} from "three";

import vertexShader from "../shaders/vertex.glsl";
import fragmentShader from "../shaders/fragment.glsl";

export default function Experience() {
	const { scene } = useGLTF("/assets/RuinsScene/ruins3js.glb");
	const { baked } = useTexture(
		{ baked: "/assets/RuinsScene/ruins-baked.jpg" },
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

	const modelRef = useRef<Group>(null);
	const emmissionMaterialRef = useRef<ShaderMaterial>();

	const emmissionMaterial = useMemo(
		() =>
			new ShaderMaterial({
				vertexShader,
				fragmentShader,
				uniforms: {
					uTime: { value: 0 },
				},
			}),
		[]
	);

	useFrame((_, delta) => {
		emmissionMaterial.uniforms.uTime.value += delta;
	});

	useEffect(() => {
		if (modelRef.current) {
			const bakedMaterial = new MeshBasicMaterial({ map: baked });

			emmissionMaterialRef.current = emmissionMaterial;

			modelRef.current.traverse((child) => {
				if (!(child instanceof Mesh)) {
					return;
				}

				if (child.name.match(/^Glyph/)) {
					child.material = emmissionMaterial;
				} else {
					child.material = bakedMaterial;
				}
			});
		}
	}, [baked, emmissionMaterial]);

	return (
		<>
			<OrbitControls maxPolarAngle={Math.PI / 2} />
			<primitive
				ref={modelRef}
				object={scene}
			/>

			{/* <mesh
				material={emmissionMaterial}
				rotation-x={-Math.PI / 2}
			>
				<planeGeometry args={[2, 2]} />
			</mesh> */}

			<Environment preset="sunset" />
		</>
	);
}

useGLTF.preload("/assets/RuinsScene/ruins.glb");
useTexture.preload("/assets/RuinsScene/ruins-baked.jpg");
