import { useTexture } from "@react-three/drei";
import { Mesh, PlaneGeometry, ShaderMaterial, Uniform } from "three";

import vertexShader from "../shaders/leftDisplay/vertexShader.glsl";
import fragmentShader from "../shaders/leftDisplay/fragmentShader.glsl";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import gsap from "gsap";

type Props = {
	nodes: {
		DisplayLeft001: Mesh;
	};
};

export default function LeftDisplay({ nodes }: Props) {
	const [banner1, banner2] = useTexture(
		[
			"/assets/VendingMachine/banner1.png",
			"/assets/VendingMachine/banner2.png",
		]
	);

	const [staticUniforms] = useState(() => {
		return {
			uTexture1: new Uniform(banner1),
			uTexture2: new Uniform(banner2),
			uProgress: new Uniform(0),
		};
	});

	const materialRef = useRef<ShaderMaterial>(null);
	const timelineRef = useRef<gsap.core.Timeline>();

	useEffect(() => {
		if (materialRef.current) {
			timelineRef.current = gsap
				.timeline()
				.set(materialRef.current.uniforms.uProgress, {
					value: 0,
					delay: 3,
				})
				.set(materialRef.current.uniforms.uTexture1, {
					value: banner1,
				})
				.set(materialRef.current.uniforms.uTexture2, {
					value: banner2,
				})

				.to(materialRef.current.uniforms.uProgress, {
					value: 1,
					duration: 1,
				})
				.set(materialRef.current.uniforms.uTexture1, {
					value: banner2,
					delay: 3,
				})
				.set(materialRef.current.uniforms.uTexture2, {
					value: banner1,
				})
				.set(materialRef.current.uniforms.uProgress, {
					value: 0,
				})
				.to(materialRef.current.uniforms.uProgress, {
					value: 1,
					duration: 1,
				})
				.repeatDelay(3)
				.repeat(-1);

			return () => {
				timelineRef.current?.kill();
			};
		}
	}, [banner1, banner2]);

	useLayoutEffect(() => {
		/** reset uv */
		nodes.DisplayLeft001.geometry.attributes.uv = new PlaneGeometry(
			1,
			1
		).attributes.uv;
	}, [nodes.DisplayLeft001.geometry]);

	return (
		<mesh geometry={nodes.DisplayLeft001.geometry}>
			<shaderMaterial
				toneMapped={false}
				ref={materialRef}
				key={Date.now()}
				vertexShader={vertexShader}
				fragmentShader={fragmentShader}
				uniforms={{
					...staticUniforms,
				}}
			/>
		</mesh>
	);
}
