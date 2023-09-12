"use client";

import { Mesh, ShaderMaterial } from "three";
import Model from "./Model";
import { Suspense, useRef, useState } from "react";
import { gsap } from "gsap";

const assets = [
	"tiger-texture4.jpg",
	"panda-texture2.jpg",
	"bear-texture.jpg",
	"fox-texture.jpg",
	"corgi-texture.jpg",
	"panda-texture.jpg",
	"lion-texture2.jpg",
];

export default function Experience() {
	const meshRef = useRef<Mesh>(null);
	const animationRef = useRef(false);
	const [assetIdx, setAssetIdx] = useState(() =>
		Math.round(Math.random() * (assets.length - 1))
	);

	const asset = assets[assetIdx];

	const onSlideChange = () => {
		if (animationRef.current || !meshRef.current) return;

		const timeline = gsap.timeline().add(() => {
			animationRef.current = true;
		});

		if (meshRef.current.material instanceof ShaderMaterial) {
			const uniforms = meshRef.current.material.uniforms;

			timeline
				.add(
					gsap.to(uniforms.uRandom, {
						value: 5,
						duration: 0.8,
					}),
					"hideStart"
				)
				.add(
					gsap.to(uniforms.uDepth, {
						value: -20,
						duration: 0.8,
					}),
					"hideStart"
				)
				.add(
					gsap.to(uniforms.uSize, {
						value: 0,
						duration: 0.8,
					}),
					"hideStart"
				)
				.add(() => {
					setAssetIdx((state) => (state + 1) % assets.length);
				});
		}

		timeline.add(() => {
			animationRef.current = false;
		});
	};

	return (
		<>
			<color
				args={["black"]}
				attach={"background"}
			/>
			<group onClick={onSlideChange}>
				<Suspense fallback={null}>
					<Model
						src={`/assets/InteractiveParticles/${asset}`}
						ref={meshRef}
					/>
				</Suspense>
			</group>
		</>
	);
}
