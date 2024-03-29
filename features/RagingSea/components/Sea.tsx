import { useControls } from "leva";
import { Color, PlaneGeometry, ShaderMaterial, Uniform } from "three";

import vertexShader from "../shaders/vertex.glsl";
import fragmentShader from "../shaders/fragment.glsl";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import gsap from "gsap";

type Props = {
	uBigWavesElevation: number;
	uBigWavesFrequency: [number, number];
	uBigWavesSpeed: number;
};

export default function Sea({
	uBigWavesElevation,
	uBigWavesFrequency,
	uBigWavesSpeed,
}: Props) {
	const surfaceRef = useRef<ShaderMaterial>(null);
	const planeRef = useRef<PlaneGeometry>(null);

	const {
		uSmallWavesElevation,
		uSmallWavesFrequency,
		uSmallWavesSpeed,
		uSmallIterations,
		uDepthColor,
		uSurfaceColor,
		uColorOffset,
		uColorMultiplier,
	} = useControls({
		uSmallWavesElevation: {
			value: 0.15,
			min: 0,
			max: 0.25,
			step: 0.001,
		},
		uSmallWavesFrequency: {
			value: 3,
			min: 0,
			max: 30,
			step: 0.001,
		},
		uSmallWavesSpeed: {
			value: 0.2,
			min: 0,
			max: 4,
			step: 0.001,
		},
		uSmallIterations: {
			value: 4,
			min: 0,
			max: 5,
			step: 1,
		},
		uDepthColor: "#ff4000",
		uSurfaceColor: "#151c37",
		uColorOffset: {
			value: 0.925,
			min: 0,
			max: 1,
			step: 0.001,
		},
		uColorMultiplier: {
			value: 1,
			min: 0,
			max: 10,
			step: 0.001,
		},
	});

	useFrame(({ clock }) => {
		if (surfaceRef.current) {
			surfaceRef.current.uniforms.uTime.value = clock.elapsedTime;
		}
	});

	useEffect(() => {
		if (planeRef.current) {
			planeRef.current.deleteAttribute("normal");
			planeRef.current.deleteAttribute("uv");
		}
	}, []);

	useEffect(() => {
		if (surfaceRef.current) {
			const tl = gsap
				.timeline()
				.to(surfaceRef.current.uniforms.uLightningIntensity, {
					value: 30,
					duration: 0.1,
				})
				.to(
					surfaceRef.current.uniforms.uLightningDecay,
					{
						value: 1.1,
						duration: 0.1,
					},
					"-=0.1"
				)
				.to(surfaceRef.current.uniforms.uLightningIntensity, {
					value: 10,
					duration: 0.2,
				})
				.to(
					surfaceRef.current.uniforms.uLightningDecay,
					{
						value: 0.2,
						duration: 0.2,
					},
					"-=0.2"
				)
				.to(surfaceRef.current.uniforms.uLightningIntensity, {
					value: 40,
					duration: 0.1,
				})
				.to(
					surfaceRef.current.uniforms.uLightningDecay,
					{
						value: 1,
						duration: 0.1,
					},
					"-=0.1"
				)
				.to(surfaceRef.current.uniforms.uLightningIntensity, {
					value: 0,
					duration: 0.3,
				})
				.to(
					surfaceRef.current.uniforms.uLightningDecay,
					{
						value: 0,
						duration: 0.3,
					},
					"-=0.3"
				)
				.repeatDelay(3)
				.repeat(-1);

			return () => {
				tl?.kill();
			};
		}
	}, []);

	return (
		<mesh rotation-x={-Math.PI / 2}>
			<planeGeometry
				args={[3, 3, 512, 512]}
				ref={planeRef}
			/>
			<shaderMaterial
				ref={surfaceRef}
				key={Date.now()}
				transparent
				vertexShader={vertexShader}
				fragmentShader={fragmentShader}
				uniforms={{
					uTime: new Uniform(0),
					uBigWavesElevation: new Uniform(uBigWavesElevation),
					uBigWavesFrequency: new Uniform(uBigWavesFrequency),
					uBigWavesSpeed: new Uniform(uBigWavesSpeed),
					uSmallWavesElevation: new Uniform(uSmallWavesElevation),
					uSmallWavesFrequency: new Uniform(uSmallWavesFrequency),

					uSmallWavesSpeed: new Uniform(uSmallWavesSpeed),
					uSmallIterations: new Uniform(uSmallIterations),

					uDepthColor: new Uniform(new Color(uDepthColor)),
					uSurfaceColor: new Uniform(new Color(uSurfaceColor)),
					uColorOffset: new Uniform(uColorOffset),
					uColorMultiplier: new Uniform(uColorMultiplier),
					uLightningIntensity: new Uniform(0),
					uLightningDecay: new Uniform(0),
				}}
			/>
		</mesh>
	);
}
