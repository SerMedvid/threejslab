uniform sampler2D perlinTexture;
uniform float time;
uniform float rotationSpeed;
uniform float seed;

varying vec2 vUv;

vec2 rotate2D(vec2 value, float angle) {
    float s = sin(angle);
    float c = cos(angle);
    mat2 m = mat2(c, s, -s, c);
    return m * value;
}

void main() {
    vUv = uv;

    vec3 newPosition = position;

    float twistPerlin = texture2D(perlinTexture, vec2(0.5 * seed, uv.y * 0.2 - time * rotationSpeed)).r;
    float angle = twistPerlin * 10.;
    newPosition.xz = rotate2D(newPosition.xz, angle);

    vec2 windOffset = vec2(texture2D(perlinTexture, vec2(0.25 * seed, time * 0.01)).r - 0.5, (perlinTexture, vec2(0.75 * seed, time * 0.01)).r -0.5);

    windOffset *= pow(uv.y, 2.) * 10.;

    newPosition.xz += windOffset;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.);
}