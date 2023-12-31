"use client";

import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
	LinearSRGBColorSpace,
	NoToneMapping,
	Points,
	ShaderMaterial,
} from "three";
import { useControls } from "leva";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { BloomEffect } from "postprocessing";

import Model, { ModelGroupRef } from "./Model";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";

import gsap from "gsap";

const meshGuard = (mesh: Points | null | undefined): mesh is Points => {
	return !!mesh;
};

const meshMaterialGuard = (
	mesh: Points | null | undefined
): mesh is Points<any, ShaderMaterial> => {
	return meshGuard(mesh) && mesh.material instanceof ShaderMaterial;
};

export default function Expirience() {
	const groupRef = useRef<ModelGroupRef>(null);
	const bloomRef = useRef<typeof BloomEffect>(null);
	const timelineRef = useRef<gsap.core.Timeline | null>(null);
	const [isReadyForAnimation, setIsReadyForAnimation] =
		useState<boolean>(false);

	const id = Math.random();

	const { distortionRate, bloomIntensity } = useControls({
		distortionRate: {
			value: 0,
			min: 0,
			max: 4,
		},
		bloomIntensity: {
			value: 0,
			min: 0,
			max: 10,
			step: 0.1,
		},
	});

	const textures = useTexture({
		texture1start: "/assets/ExplodingParticles/video-01-start.jpg",
		texture1end: "/assets/ExplodingParticles/video-01-end.jpg",
		texture2start: "/assets/ExplodingParticles/video-02-start.jpg",
		texture2end: "/assets/ExplodingParticles/video-02-end.jpg",
		texture3start: "/assets/ExplodingParticles/video-03-start.jpg",
		texture3end: "/assets/ExplodingParticles/video-03-end.jpg",
	});

	useFrame((state) => {
		const { gl } = state;

		if (
			groupRef.current?.mesh &&
			groupRef.current?.mesh.material instanceof ShaderMaterial
		) {
			groupRef.current.mesh.material.uniforms.uTime.value =
				state.clock.elapsedTime;
		}

		gl.toneMapping = NoToneMapping;
		gl.outputColorSpace = LinearSRGBColorSpace;
	});

	const buildAnimation = useCallback(() => {
		const timeline = gsap
			.timeline()
			.add(
				gsap.set(bloomRef.current, {
					intensity: bloomIntensity,
				})
			)
			.delay(1);

		if (meshMaterialGuard(groupRef.current?.mesh)) {
			const mesh = groupRef.current?.mesh as Points<any, ShaderMaterial>;
			const uniforms = mesh.material.uniforms;

			[...Array(3)].forEach((_, idx, arr) => {
				const slideNum = idx + 1;
				const nextSlideNum = (slideNum % arr.length) + 1;

				timeline
					.add(gsap.set(groupRef.current?.video || null, { opacity: 1 }))
					.add(() => {
						if (groupRef.current?.video) {
							groupRef.current.video.currentTime = 0;

							groupRef.current.video.onended = () => {
								timeline.resume();
								mesh.visible = true;
							};
						}
					})
					.set({}, {}, "+=2")
					.add(() => {
						timeline.pause();

						if (groupRef.current?.video) {
							groupRef.current.video.play();
							mesh.visible = false;
						}
					})
					.set(uniforms.uTStart, {
						value: textures[`texture${slideNum}end` as keyof typeof textures],
					})
					.set(uniforms.uTEnd, {
						value:
							textures[`texture${nextSlideNum}start` as keyof typeof textures],
					})
					.add(
						gsap.set(uniforms.uProgress || null, {
							value: 0,
						})
					)
					.add(gsap.set(groupRef.current?.video || null, { opacity: 0 }))
					.add(
						gsap.to(uniforms.uDistortionRate || null, {
							value: 2,
							duration: 2,
							ease: "Power1.easeOut",
						}),
						`slide${slideNum}end`
					)
					.add(
						gsap.to(bloomRef.current, {
							intensity: 4,
							duration: 1.5,
							ease: "Power1.easeOut",
						}),
						`slide${slideNum}end`
					)
					.add(
						gsap.to(uniforms.uProgress || null, {
							value: 1,
							duration: 1,
						}),
						"-=0.5"
					)
					.add(
						gsap.to(bloomRef.current, {
							intensity: 0,
							duration: 0.75,
							delay: 0.75,
							ease: "Power1.easeIn",
						}),
						`slide${nextSlideNum}start`
					)
					.add(
						gsap.to(uniforms.uDistortionRate || null, {
							value: 0,
							duration: 1.5,
							ease: "Power1.easeIn",
						}),
						`slide${nextSlideNum}start`
					)
					.add(
						gsap.to(uniforms.uProgress || null, {
							value: 1,
							duration: 1,
						})
					)
					.add(() => {
						if (groupRef.current?.video) {
							groupRef.current.video.src = `/assets/ExplodingParticles/video-0${nextSlideNum}.mp4`;
						}
					});
			});
		}

		timeline.repeat(-1);

		return timeline;
	}, [bloomIntensity, textures]);

	useEffect(() => {
		if (isReadyForAnimation) {
			timelineRef.current = buildAnimation();
			return () => {
				timelineRef.current?.kill();
			};
		}
	}, [buildAnimation, isReadyForAnimation, id]);

	return (
		<>
			<color
				attach={"background"}
				args={["#000"]}
			/>
			{/* <OrbitControls /> */}

			<EffectComposer>
				<Bloom
					ref={bloomRef}
					intensity={bloomIntensity}
					luminanceThreshold={0.01}
					luminanceSmoothing={0.025}
				/>
			</EffectComposer>

			<Suspense fallback={null}>
				<Model
					ref={groupRef}
					distortionRate={distortionRate}
					videoSrc="/assets/ExplodingParticles/video-01.mp4"
					texture={textures["texture1start"]}
					onAnimationReady={setIsReadyForAnimation}
				/>
			</Suspense>
		</>
	);
}

useTexture.preload("/assets/ExplodingParticles/video-01-start.jpg");
useTexture.preload("/assets/ExplodingParticles/video-01-end.jpg");
