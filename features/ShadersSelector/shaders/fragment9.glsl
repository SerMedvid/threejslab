varying vec2 vUv;

void main() {
    float strength = mod(vUv.y * 10., 1.);

    strength = step(0.8, strength);

    gl_FragColor = vec4(strength, strength, strength, 1.);
}