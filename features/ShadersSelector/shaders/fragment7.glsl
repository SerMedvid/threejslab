varying vec2 vUv;

void main() {
    float strength = mod(vUv.y * 10., 1.);

    gl_FragColor = vec4(strength, strength, strength, 1.);
}