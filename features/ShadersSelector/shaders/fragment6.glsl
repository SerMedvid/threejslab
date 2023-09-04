varying vec2 vUv;

void main() {
    float strength = (vUv.y) * 10.;

    gl_FragColor = vec4(strength, strength, strength, 1.);
}