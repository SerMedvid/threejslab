import { useControls } from "leva";
import {
	Color,
	IcosahedronGeometry,
	Mesh,
	MeshDepthMaterial,
	MeshPhysicalMaterial,
	RGBADepthPacking,
	Uniform,
} from "three";
import CustomShaderMaterial from "three-custom-shader-material";

import wobbleVertexShader from "../shaders/wobble/vertex.glsl";
import wobbleFragmentShader from "../shaders/wobble/fragment.glsl";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { useGLTF } from "@react-three/drei";

export default function Model() {
	const {
		metalness,
		roughness,
		transmission,
		ior,
		thickness,
		positionFrequency,
		timeFrequency,
		strength,
		warpPositionFrequency,
		warpStrength,
		warpTimeFrequency,
		colorA,
		colorB,
	} = useControls({
		metalness: { value: 0, min: 0, max: 1, step: 0.05 },
		roughness: { value: 0.5, min: 0, max: 1, step: 0.05 },
		transmission: { value: 0, step: 0.05 },
		ior: { value: 1.5, step: 0.1 },
		thickness: { value: 1.5, step: 0.1 },

		positionFrequency: {
			value: 0.5,
			min: 0,
			max: 2,
			step: 0.001,
		},
		timeFrequency: {
			value: 0.4,
			min: 0,
			max: 2,
			step: 0.001,
		},
		strength: {
			value: 0.4,
			min: 0,
			max: 2,
			step: 0.001,
		},

		warpPositionFrequency: {
			value: 0.38,
			min: 0,
			max: 2,
			step: 0.001,
		},
		warpTimeFrequency: {
			value: 0.12,
			min: 0,
			max: 2,
			step: 0.001,
		},
		warpStrength: {
			value: 1.7,
			min: 0,
			max: 2,
			step: 0.001,
		},

		colorA: "#0000ff",
		colorB: "#ff0000",
	});

	// const model = useGLTF("/assets/WobblySphere/suzanne.glb");

	const geometry = useMemo(() => {
		let geo = new IcosahedronGeometry(2.5, 50);
		geo = mergeVertices(geo) as IcosahedronGeometry;
		geo.computeTangents();

		return geo;
	}, []);

	const modelRef = useRef<Mesh>(null);

	const staticUniformsRef = useRef({
		uTime: new Uniform(0),
	});

	const flexUniforms = useMemo(
		() => ({
			uPositionFrequency: new Uniform(positionFrequency),
			uTimeFrequency: new Uniform(timeFrequency),
			uStrength: new Uniform(strength),
			uWarpPositionFrequency: new Uniform(warpPositionFrequency),
			uWarpTimeFrequency: new Uniform(warpTimeFrequency),
			uWarpStrength: new Uniform(warpStrength),
		}),
		[
			positionFrequency,
			timeFrequency,
			strength,
			warpPositionFrequency,
			warpStrength,
			warpTimeFrequency,
		]
	);

	const uniforms = { ...staticUniformsRef.current, ...flexUniforms };

	useFrame((_, delta) => {
		staticUniformsRef.current.uTime.value += delta;
	});

	return (
		<>
			<mesh
				receiveShadow
				castShadow
				ref={modelRef}
				geometry={geometry}
			>
				<CustomShaderMaterial
					key={Date.now()}
					baseMaterial={MeshPhysicalMaterial}
					vertexShader={wobbleVertexShader}
					fragmentShader={wobbleFragmentShader}
					metalness={metalness}
					roughness={roughness}
					transmission={transmission}
					ior={ior}
					thickness={thickness}
					transparent
					wireframe={false}
					uniforms={{
						...uniforms,
						uColorA: new Uniform(new Color(colorA)),
						uColorB: new Uniform(new Color(colorB)),
					}}
				/>

				<CustomShaderMaterial
					attach="customDepthMaterial"
					baseMaterial={MeshDepthMaterial}
					vertexShader={wobbleVertexShader}
					depthPacking={RGBADepthPacking}
					uniforms={uniforms}
				/>
			</mesh>

			<mesh
				receiveShadow
				rotation-y={Math.PI}
				position={[0, -5, 5]}
			>
				<planeGeometry args={[15, 15, 15]} />
				<meshStandardMaterial />
			</mesh>
		</>
	);
}
