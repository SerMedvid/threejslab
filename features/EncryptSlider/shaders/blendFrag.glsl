uniform sampler2D uImageTexture;
uniform sampler2D uTextTexture;

varying vec2 vUv;

void main() {
    float progress = smoothstep(0.5, 0.51, vUv.x);
    vec4 imageTexture = texture(uImageTexture, vUv);

    vec4 textTexture = texture(uTextTexture, vUv);

    gl_FragColor = mix(imageTexture, textTexture, progress);
}