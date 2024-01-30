import { shaderMaterial } from "@react-three/drei";
import sobelVertex from "../shaders/sobelVertex.glsl";
import sobelFragment from "../shaders/sobelFragment.glsl";
import { ReactThreeFiber } from "@react-three/fiber";
import { Texture } from "three";

export const SobelMaterial = shaderMaterial(
	{
		uTexture: null,
		uWidth: null,
		uHeight: null,
	},
	sobelVertex,
	sobelFragment
);

export type SobelMaterialT = typeof SobelMaterial &
	JSX.IntrinsicElements["shaderMaterial"] & {
		uWidth: number;
		uTexture: Texture;
		uHeight: number;
	};

declare global {
	namespace JSX {
		interface IntrinsicElements {
			sobelMaterial: ReactThreeFiber.Object3DNode<
				SobelMaterialT,
				typeof SobelMaterial
			>;
		}
	}
}
