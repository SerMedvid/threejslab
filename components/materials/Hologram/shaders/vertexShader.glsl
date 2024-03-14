uniform float time;

varying vec3 vPosition;
varying vec3 vNormal;

float random2D(vec2 value) {
    return fract(sin(dot(value.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.);

    // Glitch
    float glitchTime = time - modelPosition.y;
    float glitchStrenght = sin(glitchTime) + sin(glitchTime * 3.45) + sin(glitchTime * 8.76);

    glitchStrenght /= 3.;
    glitchStrenght = smoothstep(0.3, 1., glitchStrenght);
    glitchStrenght *= 1.25;
    modelPosition.x += (random2D(modelPosition.xz + time) - 0.5) * glitchStrenght;
    modelPosition.z += (random2D(modelPosition.zx + time) - 0.5) * glitchStrenght;

    gl_Position = projectionMatrix * viewMatrix * modelPosition;

    vec4 modelNormal = modelMatrix * vec4(normal, 0.);

    vPosition = modelPosition.xyz;
    vNormal = modelNormal.xyz;
}
