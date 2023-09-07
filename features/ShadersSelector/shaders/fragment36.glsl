varying vec2 vUv;

void main() {
    float strength = 1. - step(0.01, abs(distance(vUv, vec2(0.5)) - 0.25));

    gl_FragColor = vec4(strength, strength, strength, 1.);
}