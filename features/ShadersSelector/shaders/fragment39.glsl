varying vec2 vUv;

void main() {
    vec2 wavedUv = vec2(vUv.x + sin(vUv.y * 100.) * 0.1, vUv.y + sin(vUv.x * 100.) * 0.1);

    float strength = 1. - step(0.01, abs(distance(wavedUv, vec2(0.5)) - 0.25));

    gl_FragColor = vec4(strength, strength, strength, 1.);
}