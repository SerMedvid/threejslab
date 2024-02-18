attribute float aVelocity;
attribute float aRandom;
attribute float size;

uniform float uTime;
uniform float uWidth;

varying float vRandom;

void main() {
    vRandom = aRandom;

    vec3 pos = position;
    pos.x = fract(aVelocity * uTime * 0.2 - aRandom);
    pos.x = (pos.x - 0.5) * uWidth;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.);
    gl_PointSize = size * (1. / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
}