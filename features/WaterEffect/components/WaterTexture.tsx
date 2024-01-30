import { RenderTexture, useTrailTexture } from "@react-three/drei";
import { ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import InnerScene from "./InnerScene";

import vertexShader from "../shaders/vertexShader.glsl";
import fragmentShader from "../shaders/fragmentShader.glsl";
import { useControls } from "leva";
import { useCallback, useRef } from "react";
import { ShaderMaterial, Vector2 } from "three";
import { easing } from "maath";

export default function WaterTexture() {
	const { width, height } = useThree((state) => state.viewport);

	const { radius, intensity, maxAge, size, smoothing } = useControls({
		radius: 0.11,
		intensity: 0.8,
		maxAge: 500,
		size: 256,
		smoothing: 0.2,
	});

	const [texture, onMove] = useTrailTexture({
		radius,
		intensity,
		maxAge,
		size,
		smoothing,
	});

	const materialRef = useRef<ShaderMaterial>(null);
	const movementRef = useRef(new Vector2(0, 0));

	useFrame((_, delta) => {
		if (materialRef.current) {
			easing.damp2(
				materialRef.current.uniforms.uDirection.value,
				movementRef.current,
				0.5,
				delta
			);
		}
	});

	const onMoving = useCallback(
		(event: ThreeEvent<PointerEvent>) => {
			if (movementRef.current) {
				movementRef.current.x = event.movementX > 0 ? -2 : 2;
				movementRef.current.y = event.movementX > 0 ? -2 : 2;
			}

			onMove(event);
		},
		[onMove]
	);

	return (
		<mesh
			scale={[width, height, 1]}
			onPointerMove={onMoving}
		>
			<planeGeometry />

			<shaderMaterial
				ref={materialRef}
				key={Date.now().toString()}
				vertexShader={vertexShader}
				fragmentShader={fragmentShader}
				uniforms={{
					uSceneTexture: {
						value: null,
					},
					uMoveTexture: {
						value: texture,
					},
					uDirection: {
						value: new Vector2(0, 0),
					},
				}}
			>
				<RenderTexture
					attach={"uniforms-uSceneTexture-value"}
					sourceFile={undefined}
				>
					<InnerScene />
				</RenderTexture>
			</shaderMaterial>
		</mesh>
	);
}
