varying vec3 vPosition;
varying vec3 vNormal;

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.);

    gl_Position = projectionMatrix * viewMatrix * modelPosition;

    vPosition = modelPosition.xyz;
    vNormal = vec4(modelMatrix * vec4(normal, 0.0)).xyz;
}