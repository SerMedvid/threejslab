varying vec2 vUv;

void main() {
    float strength = atan(vUv.x, vUv.y);

    gl_FragColor = vec4(strength, strength, strength, 1.);
}