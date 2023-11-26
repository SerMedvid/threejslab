"use client";

import { useRef } from "react";
import { Text, useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Mesh, ShaderMaterial } from "three";
import vertexShader from "../shaders/vertex.glsl";
import fragmentShader from "../shaders/fragment.glsl";

const curve = (position: number, p = 0.8) =>
	position == 0
		? 0
		: Math.pow(Math.abs(position), p) * (position / Math.abs(position));

export default function DesertModel() {
	const { texture, maps } = useTexture({
		texture: "/assets/DistortionEffect/desert.jpg",
		maps: "/assets/DistortionEffect/desert-maps.jpg",
	});
	const materialRef = useRef<ShaderMaterial>(null);
	const meshlRef = useRef<Mesh>(null);

	const { width, height } = useThree((state) => state.size);
	const {
		image: { width: imgWidth, height: imgHeight },
	} = texture;

	useFrame((state, delta) => {
		if (materialRef.current) {
			const {
				pointer: { x, y },
			} = state;

			materialRef.current.uniforms.uTime.value += delta * 50;
			materialRef.current.uniforms.uMouse.value = [-curve(x), -curve(y)];
		}
	});

	return (
		<group>
			<mesh
				scale={[width, height, 1]}
				ref={meshlRef}
			>
				<shaderMaterial
					key={Date.now().toString()}
					ref={materialRef}
					vertexShader={vertexShader}
					fragmentShader={fragmentShader}
					uniforms={{
						uTexture: { value: texture },
						uMaps: { value: maps },
						uResolution: { value: [width, height] },
						uTextureSize: { value: [imgWidth, imgHeight] },
						uTime: { value: 0 },
						uMouse: {
							value: [0, 0],
						},
					}}
				/>
				<planeGeometry args={[1, 1, 100, 100]} />
			</mesh>
			<Text
				fontSize={84}
				font="/fonts/Inter-Medium.ttf"
				position={[-width / 4, height / 8, 0]}
			>
				Africa
			</Text>
		</group>
	);
}
