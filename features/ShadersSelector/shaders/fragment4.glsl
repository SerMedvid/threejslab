varying vec2 vUv;

void main() {
    float strength = vUv.y;

    gl_FragColor = vec4(strength, strength, strength, 1.);
}