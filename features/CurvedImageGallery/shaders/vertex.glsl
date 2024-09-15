uniform vec2 uOffset;

varying vec2 vUv;

void main() {
    vUv = uv;

    vec3 pos = position;

    pos.x += sin(uv.y * 3.14) * uOffset.x * 0.1;
    pos.y += sin(uv.x * 3.14) * uOffset.y * 0.07;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}