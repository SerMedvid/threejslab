import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
	BoxGeometry,
	Color,
	Mesh,
	MeshDepthMaterial,
	MeshStandardMaterial,
	PlaneGeometry,
	RGBADepthPacking,
	ShaderMaterial,
	Uniform,
} from "three";
import { Brush, Evaluator, SUBTRACTION } from "three-bvh-csg";
import CustomShaderMaterial from "three-custom-shader-material";

import vertexShader from "../shaders/terrain/vertex.glsl";
import fragmentShader from "../shaders/terrain/fragment.glsl";
import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";

export default function Model() {
	const [evaluator] = useState(() => new Evaluator());

	const board = useMemo(() => {
		const boardFill = new Brush(new BoxGeometry(11, 2, 11));

		// boardFill.material.color.set("red");
		const boardHole = new Brush(new BoxGeometry(10, 2.1, 10));
		// boardHole.position.y = 0.2;
		// boardHole.updateMatrixWorld();

		const board = evaluator.evaluate(boardFill, boardHole, SUBTRACTION);
		board.geometry.clearGroups();

		return board;
	}, [evaluator]);

	const meshRef = useRef<Mesh<PlaneGeometry, ShaderMaterial>>(null);

	useLayoutEffect(() => {
		if (meshRef.current) {
			meshRef.current.geometry.rotateX(-Math.PI * 0.5);
			meshRef.current.geometry.deleteAttribute("uv");
			meshRef.current.geometry.deleteAttribute("normal");
		}
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
		...staticUniforms,
	};

	useFrame((_, delta) => {
		if (meshRef.current) {
			meshRef.current.material.uniforms.uTime.value += delta;
		}
	});

	return (
		<>
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
			>
				<planeGeometry args={[10, 10, 1, 1]} />
				<meshPhysicalMaterial
					transmission={1}
					roughness={0.3}
				/>
			</mesh>

			<mesh
				{...board}
				castShadow
				receiveShadow
			>
				<meshStandardMaterial
					color={"#ffffff"}
					metalness={0}
					roughness={0.3}
				/>
			</mesh>
		</>
	);
}
