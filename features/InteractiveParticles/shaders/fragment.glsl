uniform sampler2D uTexture;

varying vec2 vUv;
varying vec2 vPUv;

void main() {
    vec4 color = vec4(0.0);
    vec2 uv = vUv;
    vec2 puv = vPUv;

	// pixel color
    vec4 colA = texture(uTexture, puv);

	// greyscale
    float grey = colA.r * 0.21 + colA.g * 0.71 + colA.b * 0.07;
    vec4 colB = vec4(grey, grey, grey, 1.0);

	// circle
    float border = 0.3;
    float radius = 0.5;
    float dist = radius - distance(uv, vec2(0.5));
    float t = smoothstep(0.1, border, dist);

	// final color
    color = colB;
    color.a = t;

    gl_FragColor = color;

}