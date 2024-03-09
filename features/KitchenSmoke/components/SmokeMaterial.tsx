import { shaderMaterial } from "@react-three/drei";
import { ReactThreeFiber } from "@react-three/fiber";
import { Texture } from "three";

import fragmentShader from "../shaders/smoke/fragmentShader.glsl";
import vertextShader from "../shaders/smoke/vertexShader.glsl";

export const SmokeMaterial = shaderMaterial(
	{
		time: 0,
		perlinTexture: null,
		speed: 1,
		rotationSpeed: 0.005,
		density: 0.6,
		color: [1, 1, 1],
		seed: 1,
	},
	vertextShader,
	fragmentShader
);

export type SmokeMaterialT = typeof SmokeMaterial &
	JSX.IntrinsicElements["shaderMaterial"] & {
		time: number;
		perlinTexture: Texture;
		speed: number;
		rotationSpeed: number;
		density: number;
		color: [number, number, number];
		seed: number;
	};

declare global {
	namespace JSX {
		interface IntrinsicElements {
			smokeMaterial: ReactThreeFiber.Object3DNode<
				SmokeMaterialT,
				typeof SmokeMaterial
			>;
		}
	}
}
