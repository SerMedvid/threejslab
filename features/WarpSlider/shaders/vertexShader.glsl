uniform float uPushForce;
uniform vec2 uMousePosition;

varying vec2 vUv;
varying float vPushed;

void main() {
    vUv = uv;

    vec2 centeredUv = (vUv - 0.5) * 2.0;
    float pushed = length(centeredUv - uMousePosition);
    pushed = 1.0 - smoothstep(0., 1.5, pushed);
    pushed = -uPushForce * pushed;

    vPushed = pushed;

    vec3 dispPosition = position;
    dispPosition.z = pushed;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(dispPosition, 1.0);
}