attribute float aVelocity;

uniform float uTime;
uniform vec2 uResolution;

void main() {
    vec3 newPosition = position;

    newPosition.y -= mod(aVelocity * uTime * 2., 1.);

    vec4 viewPosition = viewMatrix * vec4(newPosition, 1.);

    gl_Position = projectionMatrix * viewPosition;
    gl_PointSize = uResolution.y * 0.002;
    gl_PointSize *= 1. / -viewPosition.z;
}