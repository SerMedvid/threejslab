import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";
import { ReactThreeFiber, extend } from "@react-three/fiber";

import fragmentShader from "../shaders/grassFragment.glsl";
import vertexShader from "../shaders/grassVertex.glsl";

export const GrassMaterial = shaderMaterial(
	{},
	vertexShader,
	fragmentShader,
	(self) => {
		if (self) {
			self.side = THREE.DoubleSide;
		}
	}
);

export type GrassMateriallT = typeof GrassMaterial &
	JSX.IntrinsicElements["shaderMaterial"];

declare global {
	namespace JSX {
		interface IntrinsicElements {
			grassMaterial: ReactThreeFiber.Object3DNode<
				GrassMateriallT,
				typeof GrassMaterial
			>;
		}
	}
}
