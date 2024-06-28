import { useFrame, useThree } from "@react-three/fiber";

import fragmentShader from "../shaders/fragment.glsl";
import vertexShader from "../shaders/vertex.glsl";
import { useRef, useState } from "react";
import { ShaderMaterial, Uniform } from "three";

export default function Model() {
	const { width, height } = useThree((state) => state.viewport);
	const { width: sizeWidth, height: sizeHeight } = useThree(
		(state) => state.size
	);

	const materialRef = useRef<ShaderMaterial>(null);

	useFrame(({ clock }) => {
		if (materialRef.current) {
			materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
		}
	});

	const [startUniforms] = useState(() => ({
		uTime: new Uniform(0),
	}));

	return (
		<mesh>
			<planeGeometry args={[width, height]} />
			<shaderMaterial
				ref={materialRef}
				key={Date.now()}
				fragmentShader={fragmentShader}
				vertexShader={vertexShader}
				uniforms={{
					uResolution: new Uniform([sizeWidth, sizeHeight]),
					...startUniforms,
				}}
			/>
		</mesh>
	);
}
