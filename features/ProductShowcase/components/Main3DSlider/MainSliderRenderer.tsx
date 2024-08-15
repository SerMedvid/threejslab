import { RenderTexture, useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { LinearSRGBColorSpace, Mesh, ShaderMaterial } from "three";
import RenderScene from "./RenderScene";

import fragmentShader from "../../shaders/blur/fragment.glsl";
import vertexShader from "../../shaders/blur/vertex.glsl";

export default function MainSliderRenderer() {
	const meshRef = useRef<Mesh>(null);
	const materialRef = useRef<ShaderMaterial>(null);
	const { width, height } = useThree((state) => state.viewport);
	const { width: sizeWidth, height: sizeHeight } = useThree(
		(state) => state.size
	);

	const texture = useTexture("/assets/checker.jpg");
	const grostGlass = useTexture("/assets/ProductShowcase/frostglass2.jpg");

	useFrame((_, delta) => {
		if (meshRef.current) {
			meshRef.current.rotation.x += 0.001;
			meshRef.current.rotation.y += 0.001;
		}

		if (materialRef.current) {
			materialRef.current.uniforms.uTime.value += delta;
		}
	});

	return (
		<>
			<mesh>
				<planeGeometry args={[width, height]} />
				<shaderMaterial
					key={Date.now()}
					ref={materialRef}
					uniforms={{
						uTime: { value: 0 },
						uFrostGlass: { value: grostGlass },
						uBaseLevel: { value: texture },
						uBlurMask: { value: null },
						uResolution: { value: [sizeWidth, sizeHeight] },
					}}
					fragmentShader={fragmentShader}
					vertexShader={vertexShader}
					transparent
				>
					<RenderTexture
						attach={"uniforms-uBlurMask-value"}
						colorSpace={LinearSRGBColorSpace}
					>
						<RenderScene renderTarget={"mask"} />
					</RenderTexture>

					<RenderTexture
						attach={"uniforms-uBaseLevel-value"}
						colorSpace={LinearSRGBColorSpace}
						stencilBuffer
					>
						<RenderScene renderTarget={"final"} />
					</RenderTexture>
				</shaderMaterial>
			</mesh>
		</>
	);
}
