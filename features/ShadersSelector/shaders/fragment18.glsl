varying vec2 vUv;

void main() {
    float strength = max(abs(vUv.x - 0.5), abs(vUv.y - 0.5));

    gl_FragColor = vec4(strength, strength, strength, 1.);
}