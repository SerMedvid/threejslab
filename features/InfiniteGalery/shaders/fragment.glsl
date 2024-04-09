uniform vec2 uRatio;
uniform sampler2D uTexture;

varying vec2 vUv;

void main() {
    vec2 uv = vec2(vUv.x * uRatio.x + (1. - uRatio.x) * 0.5, vUv.y * uRatio.y + (1. - uRatio.y) * 0.5);

    vec4 texture = texture(uTexture, uv);

    gl_FragColor = vec4(texture.rgb, 1.);
}