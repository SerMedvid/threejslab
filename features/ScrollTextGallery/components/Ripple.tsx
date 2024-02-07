import { useFBO } from "@react-three/drei";
import { createPortal, useFrame, useThree } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import { Scene, ShaderMaterial, Vector2 } from "three";

import vertexShader from "../shaders/rippleVertex.glsl";
import fragmentShader from "../shaders/rippleFragment.glsl";
import { easing } from "maath";

type Props = {
	children: any;
	overlay: any;
};

export default function Ripple({ children, overlay }: Props) {
	const { height, width } = useThree((state) => state.viewport);

	const sceneTexture = useFBO();
	const overlayTexture = useFBO();
	const [scene] = useState(() => new Scene());
	const [overlayScene] = useState(() => new Scene());

	const materialRef = useRef<ShaderMaterial>(null);
	const newMousePositionRef = useRef<Vector2>(new Vector2(0, 0));

	useFrame(({ gl, camera, pointer, viewport: { aspect } }, delta) => {
		gl.setRenderTarget(sceneTexture);
		gl.render(scene, camera);
		gl.setRenderTarget(overlayTexture);
		gl.render(overlayScene, camera);
		gl.setRenderTarget(null);

		newMousePositionRef.current = pointer;

		if (materialRef.current) {
			easing.damp2(
				materialRef.current.uniforms.uMousePosition.value,
				newMousePositionRef.current,
				0.15,
				delta
			);
			materialRef.current.uniforms.uAspect.value = aspect;
			materialRef.current.uniforms.uTime.value += delta;
		}
	});

	return (
		<>
			{createPortal(children, scene)}
			{createPortal(overlay, overlayScene)}

			<mesh scale={[width, height, 1]}>
				<planeGeometry args={[1, 1]} />
				<shaderMaterial
					ref={materialRef}
					key={Date.now().toString()}
					fragmentShader={fragmentShader}
					vertexShader={vertexShader}
					uniforms={{
						uTime: {
							value: 0,
						},
						uMousePosition: {
							value: new Vector2(0, 0),
						},
						uTexture: {
							value: sceneTexture.texture,
						},
						uOverlayTexture: {
							value: overlayTexture.texture,
						},
						uAspect: {
							value: 1,
						},
					}}
				></shaderMaterial>
			</mesh>
		</>
	);
}
