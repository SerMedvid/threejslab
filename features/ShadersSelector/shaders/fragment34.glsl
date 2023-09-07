varying vec2 vUv;

void main() {
    float strength = abs(distance(vUv, vec2(0.5)) - 0.25);

    gl_FragColor = vec4(strength, strength, strength, 1.);
}