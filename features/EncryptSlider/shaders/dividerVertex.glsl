attribute float aVelocity;
attribute float aDistance;
attribute float size;

uniform float uTime;
uniform float uMaxOffset;

varying float vTreveledDistance;

void main() {
    vec3 pos = position;
    pos.x = mod(aVelocity * uTime, aDistance) * uMaxOffset;
    vTreveledDistance = pos.x;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.);
    gl_PointSize = size * (1. / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
}