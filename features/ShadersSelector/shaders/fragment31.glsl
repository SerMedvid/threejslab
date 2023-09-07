varying vec2 vUv;

void main() {
    vec2 lightUvX = vec2(vUv.x * 0.1 + 0.45, vUv.y * 0.5 + 0.25);

    float lightX = 0.015 / distance(lightUvX, vec2(0.5));

    vec2 lightUvY = vec2(vUv.x * 0.5 + 0.25, vUv.y * 0.1 + 0.45);

    float lightY = 0.015 / distance(lightUvY, vec2(0.5));

    float strength = lightX * lightY;

    gl_FragColor = vec4(strength, strength, strength, 1.);
}