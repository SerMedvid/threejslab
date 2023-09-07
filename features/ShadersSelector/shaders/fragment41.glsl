varying vec2 vUv;

void main() {
    float strength = atan(vUv.x - .5, vUv.y - .5);

    gl_FragColor = vec4(strength, strength, strength, 1.);
}