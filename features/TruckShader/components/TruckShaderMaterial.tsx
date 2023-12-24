import { shaderMaterial } from "@react-three/drei";
import vertexShader from "../shaders/vertex.glsl";
import stripesFragmentShader from "../shaders/stripesFragment.glsl";
import discFragmentShader from "../shaders/diskFragment.glsl";
import { ReactThreeFiber } from "@react-three/fiber";
import { ShaderMaterial } from "three";

export const StripesShaderMaterial = shaderMaterial(
	{},
	vertexShader,
	stripesFragmentShader
);

export const DiscShaderMaterial = shaderMaterial(
	{},
	vertexShader,
	discFragmentShader
);

declare global {
	namespace JSX {
		interface IntrinsicElements {
			stripesShaderMaterial: ReactThreeFiber.Object3DNode<
				ShaderMaterial,
				typeof StripesShaderMaterial
			>;
			discShaderMaterial: ReactThreeFiber.Object3DNode<
				ShaderMaterial,
				typeof DiscShaderMaterial
			>;
		}
	}
}
