import { shaderMaterial } from "@react-three/drei";
import revealVertex from "../shaders/revealVertex.glsl";
import revealFragment from "../shaders/revealFragment.glsl";
import { ReactThreeFiber } from "@react-three/fiber";
import { Texture } from "three";

export const RevealMaterial = shaderMaterial(
	{
		uTextureStart: null,
		uTextureEnd: null,
		uTextureProgress: null,
	},
	revealVertex,
	revealFragment
);

export type RevealMaterialT = typeof RevealMaterial &
	JSX.IntrinsicElements["shaderMaterial"] & {
		uTextureStart: Texture;
		uTextureEnd: Texture;
		uTextureProgress: Texture;
	};

declare global {
	namespace JSX {
		interface IntrinsicElements {
			revealMaterial: ReactThreeFiber.Object3DNode<
				RevealMaterialT,
				typeof RevealMaterial
			>;
		}
	}
}
