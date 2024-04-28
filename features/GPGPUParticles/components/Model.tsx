import { useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import {
	BufferAttribute,
	Mesh,
	MeshBasicMaterial,
	ShaderMaterial,
	SphereGeometry,
	Uniform,
} from "three";

import vertexShader from "../shaders/particles/vertex.glsl";
import fragmentShader from "../shaders/particles/fragment.glsl";
import { useMemo, useRef, useState } from "react";
import useGPGPU from "../hooks/useGPGPU";
import { useGLTF } from "@react-three/drei";

export default function Model() {
	const { width, height } = useThree((state) => state.size);
	const { size } = useControls({
		size: 0.04,
	});
	const gltf = useGLTF("/assets/GPGPUParticles/model.glb");

	const baseGeometry = (gltf.scene.children[0] as Mesh).geometry;

	const count = baseGeometry.attributes.position.count;

	const { texture, size: gpgpuSize } = useGPGPU({
		position: baseGeometry.attributes.position,
	});

	const ref = useRef<MeshBasicMaterial>(null);
	const shaderRef = useRef<ShaderMaterial>(null);

	const { particlesUvArray, sizesArray } = useMemo(() => {
		const particlesUvArray = new Float32Array(count * 2);
		const sizesArray = new Float32Array(count);

		for (let y = 0; y < gpgpuSize; y++) {
			for (let x = 0; x < gpgpuSize; x++) {
				const i = y * gpgpuSize + x;
				const i2 = i * 2;

				const uvX = (x + 0.5) / gpgpuSize;
				const uvY = (y + 0.5) / gpgpuSize;

				particlesUvArray[i2 + 0] = uvX;
				particlesUvArray[i2 + 1] = uvY;

				sizesArray[i] = Math.random();
			}
		}

		return { particlesUvArray, sizesArray };
	}, [count, gpgpuSize]);

	useFrame(() => {
		if (texture.current && ref.current && shaderRef.current) {
			ref.current.map = texture.current;
			shaderRef.current.uniforms.uParticlesTexture.value = texture.current;
		}
	});

	const [staticUniforms] = useState(() => ({
		uParticlesTexture: new Uniform(null),
	}));

	return (
		<>
			<points>
				<bufferGeometry
					attributes={{
						aParticlesUv: new BufferAttribute(particlesUvArray, 2),
						aColor: baseGeometry.attributes.color,
						aSize: new BufferAttribute(sizesArray, 1),
					}}
					drawRange={{
						start: 0,
						count: baseGeometry.attributes.position.count,
					}}
				/>
				<shaderMaterial
					ref={shaderRef}
					key={Date.now()}
					vertexShader={vertexShader}
					fragmentShader={fragmentShader}
					uniforms={{
						uResolution: new Uniform([width, height]),
						uSize: new Uniform(size),
						...staticUniforms,
					}}
				/>
			</points>

			<mesh
				position-x={3}
				visible={false}
			>
				<planeGeometry args={[3, 3]} />
				<meshBasicMaterial ref={ref} />
			</mesh>
		</>
	);
}
