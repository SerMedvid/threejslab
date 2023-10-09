"use client";

import { Environment, Grid, RenderTexture } from "@react-three/drei";
import React from "react";
import { useThree } from "@react-three/fiber";

import { useControls } from "leva";
import Scene from "./Scene";
import { scenes } from "../data";
import WorldCamera from "./WorldCamera";

export default function Experience() {
	const viewport = useThree((state) => state.viewport);

	const { slideDistance } = useControls({
		slideDistance: {
			value: 1,
			min: 0,
			max: 10,
		},
	});

	return (
		<>
			<ambientLight intensity={0.2} />
			<Environment preset="city" />

			<WorldCamera slideDistance={slideDistance} />

			{/** Main world */}

			<Grid
				position-y={-viewport.height / 2}
				sectionSize={1}
				sectionColor={"purple"}
				sectionThickness={1}
				cellSize={0.5}
				cellColor={"#6f6f6f"}
				cellThickness={0.6}
				infiniteGrid
				fadeDistance={50}
				fadeStrength={5}
			/>

			{scenes.map((scene, index) => (
				<mesh
					key={scene.name}
					position={[index * (viewport.width + slideDistance), 0, 0]}
				>
					<planeGeometry args={[viewport.width, viewport.height]} />

					<meshBasicMaterial toneMapped={false}>
						<RenderTexture
							attach={"map"}
							sourceFile={scene.path}
						>
							<Scene {...scene} />
						</RenderTexture>
					</meshBasicMaterial>
				</mesh>
			))}
		</>
	);
}
