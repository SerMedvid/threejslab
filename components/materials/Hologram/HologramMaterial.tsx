import { shaderMaterial } from "@react-three/drei";
import { ReactThreeFiber } from "@react-three/fiber";

import fragmentShader from "./shaders/fragmentShader.glsl";
import vertextShader from "./shaders/vertexShader.glsl";

export const HologramMaterial = shaderMaterial(
	{
		time: 0,
	},
	vertextShader,
	fragmentShader
);

export type HologramMaterialT = typeof HologramMaterial &
	JSX.IntrinsicElements["shaderMaterial"] & {
		time: number;
	};

declare global {
	namespace JSX {
		interface IntrinsicElements {
			hologramMaterial: ReactThreeFiber.Object3DNode<
				HologramMaterialT,
				typeof HologramMaterial
			>;
		}
	}
}
