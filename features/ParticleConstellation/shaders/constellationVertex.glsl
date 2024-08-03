attribute float size;

uniform float uWidth;

varying vec3 vColor;

vec3 hsl2rgb(vec3 c) {
    vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);

    return c.z + c.y * (rgb - 0.5) * (1.0 - abs(2.0 * c.z - 1.0));
}

void main() {
    vec3 pos = position;
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.);
    gl_PointSize = size * (1. / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;

    vColor = hsl2rgb(vec3((pos.x + uWidth / 2.) / uWidth, 0.85, 0.5));

}