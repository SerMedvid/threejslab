import { shaderMaterial } from "@react-three/drei";
import vertexShader from "../shaders/vertexShader.glsl";
import fragmentShader from "../shaders/fragmentShader.glsl";
import { ReactThreeFiber } from "@react-three/fiber";
import { Texture } from "three";

export const ImageSliderMaterial = shaderMaterial(
	{
		uTexture: null,
		uPrevTexture: null,
		uProgression: 1,
		uDirection: 1,
		uPushForce: 0,
		uMousePosition: [0, 0],
		uDisplacementTexture: null,
	},
	vertexShader,
	fragmentShader
);

export type ImageSliderMaterialT = typeof ImageSliderMaterial &
	JSX.IntrinsicElements["shaderMaterial"] & {
		uTexture: Texture;
		uPrevTexture: Texture;
		uDisplacementTexture: Texture;
		uProgression: number;
		uDirection: 1 | -1;
		uMousePosition: [number, number];
		uPushForce: number;
	};

declare global {
	namespace JSX {
		interface IntrinsicElements {
			imageSliderMaterial: ReactThreeFiber.Object3DNode<
				ImageSliderMaterialT,
				typeof ImageSliderMaterial
			>;
		}
	}
}
