varying vec3 vNormal;
varying vec3 vPosition;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.);

    gl_Position = projectionMatrix * viewMatrix * modelPosition;

    // Model normal
    vec4 modelNormal = modelMatrix * vec4(normal, 0.);

    vNormal = modelNormal.xyz;
    vPosition = modelPosition.xyz;
}