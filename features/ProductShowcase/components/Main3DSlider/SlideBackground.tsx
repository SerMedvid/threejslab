/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.18 public/assets/ProductShowcase/scene-global.glb -o features/ProductShowcase/components/SlideBackground.tsx -t 
*/

import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { Float, useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import useStore from "../../stores/useStore";

import gsap from "gsap";
import { degToRad } from "three/src/math/MathUtils.js";
import SlideText from "./SlideText";

type GLTFResult = GLTF & {
	nodes: {
		Float001: THREE.Mesh;
		Background: THREE.Mesh;
		BackgroundLine: THREE.Mesh;
	};
	materials: {};
};

type ContextType = Record<
	string,
	React.ForwardRefExoticComponent<JSX.IntrinsicElements["mesh"]>
>;

type Props = JSX.IntrinsicElements["group"] & {
	backgroundPosition: THREE.Vector3;
	backgroundScale: JSX.IntrinsicElements["mesh"]["scale"];
};

const COLORS = [
	new THREE.Color("#a86bfb"),
	new THREE.Color("#ffdf6b"),
	new THREE.Color("#5bf1da"),
] as const;

export function SlideBackground({
	backgroundPosition,
	backgroundScale,
	...props
}: Props) {
	const { nodes } = useGLTF(
		"/assets/ProductShowcase/scene-global.glb"
	) as GLTFResult;

	const backgroundMaterialRef = useRef<THREE.MeshBasicMaterial>(null);
	const backgroundRef = useRef<THREE.Mesh>(null);
	const prefTick = useRef(0);

	const setBackgroundObject = useStore((state) => state.setBackgroundObject);

	useEffect(() => {
		if (backgroundRef.current) {
			setBackgroundObject(backgroundRef.current);
		}
	}, [setBackgroundObject]);

	useEffect(() => {
		const unsubscribe = useStore.subscribe(
			(state) => state.tick,
			(tick) => {
				const animationMethod = tick > prefTick.current + 2 ? "set" : "to";

				const nextColor = COLORS[tick % COLORS.length];

				if (backgroundMaterialRef.current) {
					gsap[animationMethod](backgroundMaterialRef.current.color, {
						r: nextColor.r,
						g: nextColor.g,
						b: nextColor.b,
						duration: 0.8,
						delay: 0.25,
						ease: "power2.in",
					});
				}

				if (backgroundRef.current) {
					gsap[animationMethod](backgroundRef.current.rotation, {
						z: degToRad(82) - tick * degToRad(72),
						duration: 1.2,
						ease: "power2.inOut",
					});
				}

				prefTick.current = tick;
			},
			{ fireImmediately: true }
		);

		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<group
			{...props}
			dispose={null}
		>
			<Float>
				<mesh
					geometry={nodes.Float001.geometry}
					material={nodes.Float001.material}
					scale={0.65}
					position={[-2.5, 0, 1.5]}
				/>
			</Float>

			<group
				scale={backgroundScale}
				position={backgroundPosition}
				position-z={backgroundPosition?.z + 0.1}
			>
				<SlideText />
			</group>

			<mesh
				rotation-z={degToRad(82)}
				scale={backgroundScale}
				geometry={nodes.Background.geometry}
				position={backgroundPosition}
				ref={backgroundRef}
			>
				<meshBasicMaterial
					ref={backgroundMaterialRef}
					color={COLORS[0]}
				/>
			</mesh>
		</group>
	);
}

useGLTF.preload("/assets/ProductShowcase/scene-global.glb");