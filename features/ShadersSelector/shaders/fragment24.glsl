varying vec2 vUv;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
    float strength = random(floor(vUv * 10.) / 10.);

    gl_FragColor = vec4(strength, strength, strength, 1.);
}