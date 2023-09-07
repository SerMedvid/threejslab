varying vec2 vUv;

void main() {
    float x = floor(vUv.x * 10.) / 10.;
    float y = floor(vUv.y * 10.) / 10.;

    float strength = x * y;

    gl_FragColor = vec4(strength, strength, strength, 1.);
}