import {
	CameraControls,
	Image,
	PerspectiveCamera,
	useFBO,
} from "@react-three/drei";
import { createPortal, useFrame, useThree } from "@react-three/fiber";
import React, { ComponentRef, useEffect, useRef, useState } from "react";
import {
	Scene,
	ShaderMaterial,
	Uniform,
	PerspectiveCamera as PerspectiveCameraThree,
	Material,
} from "three";
import useHalftoneMaterial from "../hooks/useHalftoneMateria";

import vertexShader from "../shaders/transitionVertex.glsl";
import fragmentShader from "../shaders/transitionFragment.glsl";
import { useControls } from "leva";
import Stage from "./Stage";

import gsap from "gsap";

export default function TransitionEffect() {
	const halftoneMaterial = useHalftoneMaterial();
	const { width, height } = useThree((state) => state.viewport);
	const timelineRef = useRef<gsap.core.Timeline>();

	const shaderMaterialRef = useRef<ShaderMaterial>(null);
	const bgRef = useRef<ComponentRef<typeof Image>>(null);

	const texture1 = useFBO();
	const texture2 = useFBO();

	const [scene1] = useState(() => new Scene());
	const [scene2] = useState(() => new Scene());

	const renderCameraRef = useRef<PerspectiveCameraThree>(null);
	const cameraControlRef = useRef<CameraControls>(null);

	const { clearColor } = useControls({
		clearColor: {
			value: "#26132f",
		},
	});

	const [startUniforms] = useState(() => ({
		uProgress: new Uniform(0),
		uStartTexture: new Uniform(texture1.texture),
		uEndTexture: new Uniform(texture2.texture),
	}));

	useEffect(() => {
		if (cameraControlRef.current) {
			cameraControlRef.current.setLookAt(0.3, 4.5, 6, 0, 1, 0);
		}
	}, []);

	useEffect(() => {
		if (bgRef.current && bgRef.current.material instanceof Material) {
			bgRef.current.material.depthWrite = false;
		}
	});

	useFrame(({ gl }) => {
		if (renderCameraRef.current) {
			gl.setRenderTarget(texture1);
			gl.render(scene1, renderCameraRef.current);
			gl.setRenderTarget(texture2);
			gl.render(scene2, renderCameraRef.current);
			gl.setRenderTarget(null);
		}
	});

	useEffect(() => {
		if (shaderMaterialRef.current && bgRef.current) {
			timelineRef.current = gsap
				.timeline()
				.set(shaderMaterialRef.current.uniforms.uProgress, {
					value: 0,
				})
				.set(shaderMaterialRef.current.uniforms.uStartTexture, {
					value: texture1.texture,
				})
				.set(shaderMaterialRef.current.uniforms.uEndTexture, {
					value: texture2.texture,
				})
				.to(shaderMaterialRef.current.uniforms.uProgress, {
					value: 1,
					duration: 3,
				})
				.to(
					bgRef.current.material,
					{
						opacity: 1,
						duration: 1,
					},
					"-=2.3"
				)
				.set(shaderMaterialRef.current.uniforms.uStartTexture, {
					value: texture2.texture,
					delay: 3,
				})

				.set(shaderMaterialRef.current.uniforms.uEndTexture, {
					value: texture1.texture,
				})
				.set(shaderMaterialRef.current.uniforms.uProgress, {
					value: 0,
				})
				.to(shaderMaterialRef.current.uniforms.uProgress, {
					value: 1,
					duration: 3,
				})
				.to(
					bgRef.current.material,
					{
						opacity: 0,
						duration: 1,
					},
					"-=2.5"
				)
				.repeatDelay(3)
				.repeat(-1);

			return () => {
				timelineRef.current?.kill();
			};
		}
	}, []);

	return (
		<>
			{createPortal(<Stage bgColor={clearColor} />, scene1)}
			{createPortal(
				<Stage
					bgColor={clearColor}
					shaderMaterial={halftoneMaterial}
				/>,
				scene2
			)}

			<CameraControls ref={cameraControlRef}>
				<PerspectiveCamera
					attach={"camera"}
					ref={renderCameraRef}
					near={0.5}
					fov={65}
					position={[0, 3.6, 7.6]}
				/>
			</CameraControls>

			<Image
				scale={[width, height]}
				url="/assets/HalftoneShading/bg2.jpg"
				ref={bgRef}
				transparent
				opacity={0}
			/>

			<mesh scale={[width * 2, height * 2, 1]}>
				<planeGeometry args={[1, 1, 512, 512]} />
				<shaderMaterial
					transparent
					key={Date.now()}
					ref={shaderMaterialRef}
					vertexShader={vertexShader}
					fragmentShader={fragmentShader}
					uniforms={{ ...startUniforms }}
				/>
			</mesh>
		</>
	);
}
