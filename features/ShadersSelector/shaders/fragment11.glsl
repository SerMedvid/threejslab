varying vec2 vUv;

void main() {
    float strength = step(0.8, mod(vUv.x * 10., 1.));

    strength += step(0.8, mod(vUv.y * 10., 1.));

    gl_FragColor = vec4(strength, strength, strength, 1.);
}
