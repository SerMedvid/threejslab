uniform sampler2D uImage;
uniform float uOpacity;

varying vec2 vUv;

void main() {
    vec4 image = texture2D(uImage, vUv);
    gl_FragColor = vec4(image.rgb, uOpacity);
}