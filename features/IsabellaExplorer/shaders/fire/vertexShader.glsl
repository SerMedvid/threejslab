attribute float random;
attribute float sprite;
uniform float time;
uniform float size;
uniform float heightOfNearPlane;

varying float vSprite;
varying float vOpacity;

float PI = 3.14;

float quadraticIn(float t) {
    float tt = t * t;
    return tt * tt;
}
void main() {
    float progress = fract(time + (2.0 * random - 1.0));
    float progressNeg = 1.0 - progress;
    float ease = quadraticIn(progress);
    float influence = sin(PI * ease);
    vec3 newPosition = position * vec3(1.0, ease, 1.0);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);

    gl_PointSize = (heightOfNearPlane * size) / gl_Position.w;

    vOpacity = min(influence * 4.0, 1.0) * progressNeg;
    vSprite = sprite;
}