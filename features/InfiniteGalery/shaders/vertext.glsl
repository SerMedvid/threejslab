uniform float uTime;
uniform float uSpeed;

varying vec2 vUv;

void main() {
    vUv = uv;

    vec3 p = position;

    p.z = (sin(p.x * 4. + uTime) * 1.5 + cos(p.y * 2. + uTime) * 1.5) * (0.1 + uSpeed * 0.5);

    vec4 mvPosition = modelViewMatrix * vec4(p, 1.);
    vec4 finalPosition = projectionMatrix * mvPosition;

    gl_Position = finalPosition;
}