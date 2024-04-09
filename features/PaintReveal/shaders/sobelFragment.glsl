uniform sampler2D uTexture;
uniform float uWidth;
uniform float uHeight;
varying vec2 vUv;

void make_kernel(inout vec4 n[9], sampler2D tex, vec2 coord) {
    float w = 1.0 / uWidth;
    float h = 1.0 / uHeight;

    n[0] = texture(tex, coord + vec2(-w, -h));
    n[1] = texture(tex, coord + vec2(0.0, -h));
    n[2] = texture(tex, coord + vec2(w, -h));
    n[3] = texture(tex, coord + vec2(-w, 0.0));
    n[4] = texture(tex, coord);
    n[5] = texture(tex, coord + vec2(w, 0.0));
    n[6] = texture(tex, coord + vec2(-w, h));
    n[7] = texture(tex, coord + vec2(0.0, h));
    n[8] = texture(tex, coord + vec2(w, h));
}

void main(void) {
    vec4 n[9];
    make_kernel(n, uTexture, vUv);

    vec4 sobel_edge_h = n[2] + (2.0 * n[5]) + n[8] - (n[0] + (2.0 * n[3]) + n[6]);
    vec4 sobel_edge_v = n[0] + (2.0 * n[1]) + n[2] - (n[6] + (2.0 * n[7]) + n[8]);

    vec4 sobel = sqrt((sobel_edge_h * sobel_edge_h) + (sobel_edge_v * sobel_edge_v));

    gl_FragColor = vec4(vec3(1.0 - sobel.b), 0.5);
}