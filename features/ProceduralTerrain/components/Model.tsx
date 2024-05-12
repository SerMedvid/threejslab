import { useLayoutEffect, useRef, useState } from "react";
import {
	Color,
	Mesh,
	MeshDepthMaterial,
	MeshPhysicalMaterial,
	MeshStandardMaterial,
	PlaneGeometry,
	RGBADepthPacking,
	ShaderMaterial,
	Uniform,
} from "three";
import CustomShaderMaterial from "three-custom-shader-material";

import vertexShader from "../shaders/terrain/vertex.glsl";
import fragmentShader from "../shaders/terrain/fragment.glsl";
import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import Container from "./Container";

export default function Model() {
	const meshRef = useRef<Mesh<PlaneGeometry, ShaderMaterial>>(null);

	const waterRef = useRef<Mesh<PlaneGeometry, MeshPhysicalMaterial>>(null);

	const scrollData = useScroll();

	useFrame(() => {
		if (waterRef.current && meshRef.current) {
			const { offset: scroolOffset } = scrollData;

			if (scroolOffset < 0.2) {
				const phaseOffset = scrollData.range(-0.02, 0.2);

				meshRef.current.material.uniforms.uGrassLevel.value = 1;

				meshRef.current.material.uniforms.uStrength.value = phaseOffset * 2;

				meshRef.current.material.uniforms.uOffset.value = 1 - phaseOffset;

				meshRef.current.material.uniforms.uWarpStrength.value =
					0.1 + 0.4 * phaseOffset;
			} else if (scroolOffset < 0.5) {
				const phaseOffset = scrollData.range(0.2, 0.3);

				meshRef.current.material.uniforms.uStrength.value =
					2 + phaseOffset * 1.5;

				meshRef.current.material.uniforms.uWarpStrength.value =
					0.5 - 0.4 * phaseOffset;

				meshRef.current.material.uniforms.uGrassLevel.value =
					-0.06 + (0.3 - phaseOffset * 0.3);
			} else if (scroolOffset < 0.7) {
				const phaseOffset = scrollData.range(0.5, 0.2);

				meshRef.current.material.uniforms.uOffset.value = 0 - phaseOffset * 0.8;

				meshRef.current.material.uniforms.uWarpStrength.value =
					0.1 + 0.4 * phaseOffset;

				meshRef.current.material.uniforms.uStrength.value =
					3.5 - phaseOffset * 1.5;

				waterRef.current.position.y = -0.1 + phaseOffset * 0.8;
			} else if (scroolOffset < 0.8) {
				const phaseOffset = scrollData.range(0.7, 0.1);

				meshRef.current.material.uniforms.uOffset.value =
					-0.8 + phaseOffset * 0.8;

				meshRef.current.material.uniforms.uWarpStrength.value =
					0.5 - 0.3 * phaseOffset;

				meshRef.current.material.uniforms.uStrength.value = 2 + phaseOffset;

				waterRef.current.position.y = 0.7 - phaseOffset * 0.8;
			} else if (scroolOffset < 0.9) {
				const phaseOffset = scrollData.range(0.8, 0.1);

				meshRef.current.material.uniforms.uOffset.value = phaseOffset * 0.8;

				waterRef.current.position.y = -0.1 - phaseOffset * 0.8;
			} else {
				const phaseOffset = scrollData.range(0.9, 0.1);

				meshRef.current.material.uniforms.uOffset.value =
					0.8 - phaseOffset * 0.8;

				meshRef.current.material.uniforms.uWarpStrength.value =
					0.2 + 0.3 * phaseOffset;

				meshRef.current.material.uniforms.uStrength.value = 3 - phaseOffset;

				waterRef.current.position.y = -0.9 + phaseOffset * 0.8;
			}
		}
	});

	useLayoutEffect(() => {
		if (meshRef.current) {
			meshRef.current.geometry.rotateX(-Math.PI * 0.5);
			meshRef.current.geometry.deleteAttribute("uv");
			meshRef.current.geometry.deleteAttribute("normal");
		}

		return () => {
			if (meshRef.current) {
				meshRef.current.geometry.rotateX(Math.PI * 0.5);
			}
		};
	}, []);

	const [staticUniforms] = useState(() => ({
		uTime: new Uniform(0),
	}));

	const {
		positionFrequency,
		strength,
		warpFrequency,
		warpStrength,
		colorWaterDeep,
		colorGrass,
		colorRock,
		colorSand,
		colorSnow,
		colorWaterSurface,
		offset,
		grassLevel,
	} = useControls({
		positionFrequency: {
			value: 0.2,
			min: 0,
			max: 1,
			step: 0.001,
		},
		strength: {
			value: 2,
			min: 0,
			max: 10,
			step: 0.001,
		},
		warpFrequency: {
			value: 5,
			min: 0,
			max: 10,
			step: 0.001,
		},
		warpStrength: {
			value: 0.5,
			min: 0,
			max: 1,
			step: 0.001,
		},
		offset: {
			value: 0,
			min: -1,
			max: 1,
		},
		grassLevel: {
			value: -0.06,
			min: -0.06,
			max: 1,
		},
		colorWaterDeep: "#002b3d",
		colorWaterSurface: "#66a8ff",
		colorSand: "#ffe894",
		colorGrass: "#85d534",
		colorSnow: "#ffffff",
		colorRock: "#bfbd8d",
	});

	const uniforms = {
		uPositionFrequency: new Uniform(positionFrequency),
		uStrength: new Uniform(strength),
		uWarpFrequency: new Uniform(warpFrequency),
		uWarpStrength: new Uniform(warpStrength),
		uOffset: new Uniform(offset),
		uGrassLevel: new Uniform(grassLevel),
		...staticUniforms,
	};

	useFrame((_, delta) => {
		if (meshRef.current) {
			meshRef.current.material.uniforms.uTime.value += delta;
		}
	});

	return (
		<Container>
			<mesh
				ref={meshRef}
				receiveShadow
				castShadow
			>
				<planeGeometry args={[10, 10, 500, 500]} />
				<CustomShaderMaterial
					key={Date.now()}
					baseMaterial={MeshStandardMaterial}
					silent
					metalness={0}
					roughness={0.5}
					color={"#85d534"}
					vertexShader={vertexShader}
					fragmentShader={fragmentShader}
					uniforms={{
						...uniforms,
						uColorWaterDeep: new Uniform(new Color(colorWaterDeep)),
						uColorGrass: new Uniform(new Color(colorGrass)),
						uColorRock: new Uniform(new Color(colorRock)),
						uColorSand: new Uniform(new Color(colorSand)),
						uColorSnow: new Uniform(new Color(colorSnow)),
						uColorWaterSurface: new Uniform(new Color(colorWaterSurface)),
					}}
				/>
				<CustomShaderMaterial
					attach="customDepthMaterial"
					depthPacking={RGBADepthPacking}
					key={Date.now()}
					baseMaterial={MeshDepthMaterial}
					silent
					uniforms={uniforms}
					vertexShader={vertexShader}
				/>
			</mesh>

			<mesh
				rotation-x={-Math.PI / 2}
				position-y={-0.1}
				ref={waterRef}
			>
				<planeGeometry args={[10, 10, 1, 1]} />
				<meshPhysicalMaterial
					transmission={1}
					roughness={0.3}
				/>
			</mesh>
		</Container>
	);
}
