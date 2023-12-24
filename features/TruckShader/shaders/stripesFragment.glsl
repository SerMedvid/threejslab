uniform float uTime;
uniform float uAlpha;
uniform float uMultiplier;
uniform float uSpeed;
uniform vec3 uColorA;
uniform vec3 uColorB;

varying vec2 vUv;

void main() {
    vec2 movement = (vUv + uTime * uSpeed);
    vec2 multUv = mod(vUv * uMultiplier, 1.);
    float strenght = step(0.5, mod(multUv.y + uTime * uSpeed, 1.));
    vec3 mixColor = mix(uColorA, uColorB, step(0.5, multUv.y));
    gl_FragColor = vec4(mixColor, min(uAlpha, strenght));
}