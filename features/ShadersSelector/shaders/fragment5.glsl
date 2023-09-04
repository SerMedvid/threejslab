varying vec2 vUv;

void main() {
    float strength = 1. - vUv.y;

    gl_FragColor = vec4(strength, strength, strength, 1.);
}