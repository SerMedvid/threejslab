import { Shader } from "three";

const replaceFragmentShader = (fragmentShader: string) =>
	fragmentShader
		.replace(
			`#include <common>`,
			`#include <common>
  float exponentialEasing(float x, float a) {
  
    float epsilon = 0.00001;
    float min_param_a = 0.0 + epsilon;
    float max_param_a = 1.0 - epsilon;
    a = max(min_param_a, min(max_param_a, a));
    
    if (a < 0.5){
      // emphasis
      a = 2.0*(a);
      float y = pow(x, a);
      return y;
    } else {
      // de-emphasis
      a = 2.0*(a-0.5);
      float y = pow(x, 1.0/(1.0-a));
      return y;
    }
  }`
		)
		.replace(
			`vec4 diffuseColor = vec4( diffuse, opacity );`,
			`
float fadeDist = 350.0;
float dist = length(vViewPosition);

float fadeOpacity = smoothstep(fadeDist, 0.0, dist);
fadeOpacity = exponentialEasing(fadeOpacity, 0.93);
vec4 diffuseColor = vec4( diffuse, fadeOpacity * opacity );`
		);

export const fadeOnBeforeCompile = (shader: Shader) => {
	shader.fragmentShader = replaceFragmentShader(shader.fragmentShader);
};

export const fadeOnBeforeCompileFlat = (shader: Shader) => {
	shader.fragmentShader = replaceFragmentShader(shader.fragmentShader).replace(
		`#include <dithering_fragment>`,
		`#include <dithering_fragment>
    gl_FragColor = diffuseColor;`
	);
};
