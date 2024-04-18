import { useVideoTexture } from "@react-three/drei";

import vertexShader from "../shaders/topDisplay/vertexShader.glsl";
import fragmentShader from "../shaders/topDisplay/fragmentShader.glsl";
import { ShaderMaterial, Uniform } from "three";
import { useEffect, useRef, useState } from "react";

import gsap from "gsap";

type Props = {
	src: string;
};

export default function VideoMaterial({ src }: Props) {
	const video = useVideoTexture(src);
	video.flipY = false;

	const timelineRef = useRef<gsap.core.Timeline>();
	const timeline2Ref = useRef<gsap.core.Timeline>();
	const materialRef = useRef<ShaderMaterial>(null);

	useEffect(() => {
		if (materialRef.current) {
			timelineRef.current = gsap
				.timeline()
				.set(materialRef.current.uniforms.uGlitchProgress, {
					value: 0,
				})
				.to(materialRef.current.uniforms.uGlitchProgress, {
					value: 1,
					duration: 10,
					ease: "power2.inOut",
				})
				.repeat(-1);

			timeline2Ref.current = gsap
				.timeline()
				.to(materialRef.current.uniforms.uGlitchStrenght, {
					value: 1,
					duration: 0.5,
				})
				.to(materialRef.current.uniforms.uGlitchStrenght, {
					value: 0,
					delay: 0.25,
					duration: 0.5,
				})
				.repeat(-1);

			return () => {
				timelineRef.current?.kill();
				timeline2Ref.current?.kill();
			};
		}
	}, []);

	const [staticUniforms] = useState(() => ({
		uGlitchStrenght: new Uniform(1),
		uGlitchProgress: new Uniform(0),
	}));

	return (
		<shaderMaterial
			ref={materialRef}
			key={Date.now()}
			toneMapped={false}
			vertexShader={vertexShader}
			fragmentShader={fragmentShader}
			uniforms={{
				uTexture: new Uniform(video),
				...staticUniforms,
			}}
		/>
	);
}
