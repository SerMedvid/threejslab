uniform float uSize;
uniform float uTime;

attribute float aScale;
attribute vec3 aRandomness;

varying vec3 vColor;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.);

    float angle = atan(modelPosition.x, modelPosition.z);
    float distanceToCenter = length(modelPosition.xz);
    float angelOffset = (1. / distanceToCenter) * uTime * 0.2;
    angle += angelOffset;

    modelPosition.x = cos(angle) * distanceToCenter;
    modelPosition.z = sin(angle) * distanceToCenter;

    // Randomness

    modelPosition.xyz += aRandomness;

    vec4 mvPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * mvPosition;

    vColor = color;

    gl_PointSize = uSize * aScale;
    gl_PointSize *= (1. / -mvPosition.z);

    gl_Position = projectionPosition;
}