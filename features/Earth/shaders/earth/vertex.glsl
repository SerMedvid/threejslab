uniform sampler2D uHeightTexture;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

void main() {
    vec3 newPosition = position;
    float elevation = texture(uHeightTexture, uv).r;
    newPosition += normal * (elevation * 0.09);

    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.);

    gl_Position = projectionMatrix * viewMatrix * modelPosition;

    vNormal = vec4(modelMatrix * vec4(normal, 0.0)).xyz;
    vUv = uv;

    vPosition = modelPosition.xyz;

    gl_Position = projectionMatrix * viewMatrix * modelPosition;
}