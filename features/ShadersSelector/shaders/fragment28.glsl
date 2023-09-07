varying vec2 vUv;

void main() {
    float strength = 1. - distance(vUv, vec2(0.5));

    gl_FragColor = vec4(strength, strength, strength, 1.);
}