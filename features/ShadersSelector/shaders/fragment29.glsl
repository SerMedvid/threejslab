varying vec2 vUv;

void main() {
    float strength = 0.015 / distance(vUv, vec2(0.5));

    gl_FragColor = vec4(strength, strength, strength, 1.);
}