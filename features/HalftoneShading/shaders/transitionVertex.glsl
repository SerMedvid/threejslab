uniform float uProgress;

varying vec2 vUv;

float random2D(vec2 value) {
    return fract(sin(dot(value.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
    vec4 modelPosition = modelViewMatrix * vec4(position, 1.);
    // Glitch
    float glitchStrenght = smoothstep(0.97, 1., 1. - abs(uProgress - uv.y));
    glitchStrenght *= 1.25;

    modelPosition.x += (random2D(modelPosition.xz + uProgress) - 0.5) * glitchStrenght;
    modelPosition.y += (random2D(modelPosition.yx + uProgress) - sin(modelPosition.x * 10.) / 10.) * glitchStrenght;
    modelPosition.z += (random2D(modelPosition.zx + uProgress) - 0.5) * glitchStrenght;

    gl_Position = projectionMatrix * viewMatrix * modelPosition;

    vUv = uv;
}