varying vec2 vUv;

void main() {
    vec2 lightUv = vec2(vUv.x * 0.1 + 0.45, vUv.y * 0.4 + 0.3);

    float strength = 0.015 / distance(lightUv, vec2(0.5));

    gl_FragColor = vec4(strength, strength, strength, 1.);
}