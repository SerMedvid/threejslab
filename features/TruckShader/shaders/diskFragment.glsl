float PI = 3.14159265359;

uniform float uTime;
uniform float uAlpha;
uniform float uMultiplier;
uniform float uSpeed;
uniform vec3 uColorA;
uniform vec3 uColorB;

varying vec2 vUv;

void main() {
    vec2 multUv = mod(vUv * uMultiplier, 1.);
    float angle = atan(multUv.x - 0.5, multUv.y - 0.5) / (PI * 2.) + 0.5;
    float radius = 0.25 - sin(angle * 100.) * 0.02;
    float strength = 1. - step(0.1, abs(distance(mod(multUv + sin(uTime * uSpeed), 1.), vec2(0.5)) - radius));

    vec3 finalColor = mix(uColorA, uColorB, mod(multUv.y + uTime, 1.));

    gl_FragColor = vec4(finalColor, min(strength, uAlpha));
}