import { useControls } from "leva";
import { useMemo } from "react";
import { Color, ShaderMaterial, Uniform } from "three";

import vertexShader from "../shaders/vertex.glsl";
import fragmentShader from "../shaders/fragment.glsl";
import { useThree } from "@react-three/fiber";

export default function useHalftoneMaterial() {
	const { width, height } = useThree((state) => state.size);
	const gl = useThree((state) => state.gl);
	const pixelRatio = gl.getPixelRatio();

	const {
		color,
		shadowRepetitions,
		shadowColor,
		lightColor,
		lightRepetitions,
	} = useControls({
		color: {
			value: "#6e1290",
		},
		shadowRepetitions: {
			value: 180,
			step: 1,
			min: 20,
			max: 300,
		},
		lightRepetitions: {
			value: 181,
			step: 1,
			min: 21,
			max: 301,
		},
		shadowColor: {
			value: "#ffd05c",
		},
		lightColor: {
			value: "#e5ffe0",
		},
	});

	const material = useMemo(() => {
		return new ShaderMaterial({
			toneMapped: false,
			vertexShader: vertexShader,
			fragmentShader: fragmentShader,
			transparent: true,
			uniforms: {
				uColor: new Uniform(new Color(color)),
				uResolution: new Uniform([width * pixelRatio, height * pixelRatio]),
				uShadowRepetitions: new Uniform(shadowRepetitions),
				uLightRepetitions: new Uniform(lightRepetitions),
				uShadowColor: new Uniform(new Color(shadowColor)),
				uLightColor: new Uniform(new Color(lightColor)),
			},
		});
	}, [
		color,
		pixelRatio,
		width,
		height,
		shadowRepetitions,
		shadowColor,
		lightRepetitions,
		lightColor,
	]);

	return material;
}
