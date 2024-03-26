attribute float aVelocity;

uniform float uTime;

void main() {
    vec3 newPosition = position;

    newPosition.y -= mod(aVelocity * uTime * 2., 1.);

    vec4 viewPosition = viewMatrix * vec4(newPosition, 1.);

    gl_Position = projectionMatrix * viewPosition;
    gl_PointSize *= 1. / -viewPosition.z;
}