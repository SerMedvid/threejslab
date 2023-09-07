#define PI 3.1415926535897932384626433832795

varying vec2 vUv;

void main() {
    float angle = atan(vUv.x - .5, vUv.y - .5);
    angle /= PI * 2.;
    angle += 0.5;
    angle *= 20.;
    angle = mod(angle, 1.);
    float strength = angle;

    gl_FragColor = vec4(strength, strength, strength, 1.);
}