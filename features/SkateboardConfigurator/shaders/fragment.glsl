uniform sampler2D uTexture;

varying vec2 vUv;

void main() {
    vec4 img = texture(uTexture, vUv);

    gl_FragColor = img;
}