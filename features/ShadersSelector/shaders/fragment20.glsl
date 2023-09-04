varying vec2 vUv;

void main() {
    float square1 = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));

    float square2 = 1. - step(0.25, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));

    float strength = square1 * square2;

    gl_FragColor = vec4(strength, strength, strength, 1.);
}