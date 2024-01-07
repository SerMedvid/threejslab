import { shaderMaterial } from "@react-three/drei";

import fragment from "../shader/fragment.glsl";
import vertex from "../shader/vertex.glsl";
import { ReactThreeFiber } from "@react-three/fiber";
import { Texture } from "three";
import { resolveLygia } from "resolve-lygia";

export const SceneTransitionMaterial = shaderMaterial(
	{
		uProgression: 1,
		uTextureStart: null,
		uTextureEnd: null,
		uTransitionMode: 0,
		uRepeat: 1,
		uSmoothness: 0.5,
	},
	resolveLygia(vertex),
	resolveLygia(fragment)
);

export type SceneTransitionMaterialT = typeof SceneTransitionMaterial &
	JSX.IntrinsicElements["shaderMaterial"] & {
		uProgression: number;
		uTextureStart: Texture;
		uTextureEnd: Texture;
		uTransitionMode: number;
		uRepeat: number;
		uSmoothness: number;
	};

declare global {
	namespace JSX {
		interface IntrinsicElements {
			sceneTransitionMaterial: ReactThreeFiber.Object3DNode<
				SceneTransitionMaterialT,
				typeof SceneTransitionMaterial
			>;
		}
	}
}
