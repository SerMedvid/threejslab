import { useRef, useState } from "react";
import {
	Color,
	Mesh,
	RepeatWrapping,
	SRGBColorSpace,
	ShaderMaterial,
	SphereGeometry,
	Uniform,
	Vector3,
} from "three";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

import vertexShader from "../shaders/earth/vertex.glsl";
import fragmentShader from "../shaders/earth/fragment.glsl";

type Props = {
	geometry: JSX.Element;
	sunDirection: Vector3;
	atmosphereDayColor: string;
	atmosphereTwilghtColor: string;
};

export default function EarthModel({
	geometry,
	sunDirection,
	atmosphereDayColor,
	atmosphereTwilghtColor,
}: Props) {
	const earthRef = useRef<Mesh<SphereGeometry, ShaderMaterial>>(null);

	const {
		earthDayTexture,
		earthNightTexture,
		earthSpecularCloudsTexture,
		earthHeightTexture,
		perlinTexture,
	} = useTexture(
		{
			earthDayTexture: "/assets/Earth/textures/day.jpg",
			earthNightTexture: "/assets/Earth/textures/night.jpg",
			earthSpecularCloudsTexture: "/assets/Earth/textures/specularClouds.jpg",
			earthHeightTexture: "/assets/Earth/textures/height.jpg",
			perlinTexture: "/assets/perlin.png",
		},
		(textures) => {
			if (Array.isArray(textures)) {
				textures[0].colorSpace = SRGBColorSpace;
				textures[0].anisotropy = 8;

				textures[1].colorSpace = SRGBColorSpace;
				textures[1].anisotropy = 8;

				textures[2].anisotropy = 8;
				textures[2].wrapS = RepeatWrapping;
				textures[2].wrapT = RepeatWrapping;
				textures[3].anisotropy = 8;
				textures[4].wrapS = RepeatWrapping;
				textures[4].wrapT = RepeatWrapping;
			}
		}
	);

	const [defaultUniforms] = useState(() => ({
		uDayTexture: new Uniform(earthDayTexture),
		uNightTexture: new Uniform(earthNightTexture),
		uSpecularCloudsTexture: new Uniform(earthSpecularCloudsTexture),
		uHeightTexture: new Uniform(earthHeightTexture),
		uTime: new Uniform(0),
		uPerlinTexture: new Uniform(perlinTexture),
	}));

	useFrame((_, delta) => {
		if (earthRef.current) {
			earthRef.current.rotation.y += delta * 0.1;
			earthRef.current.material.uniforms.uTime.value += delta;
		}
	});

	return (
		<>
			<mesh ref={earthRef}>
				{geometry}
				<shaderMaterial
					key={Date.now()}
					vertexShader={vertexShader}
					fragmentShader={fragmentShader}
					uniforms={{
						...defaultUniforms,
						uSunDirection: new Uniform(sunDirection),
						uAtmosphereDayColor: new Uniform(new Color(atmosphereDayColor)),
						uAtmosphereTwilghtColor: new Uniform(
							new Color(atmosphereTwilghtColor)
						),
					}}
				/>
			</mesh>
		</>
	);
}
