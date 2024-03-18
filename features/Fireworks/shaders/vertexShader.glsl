attribute float aSize;
attribute float aTimeMultiplier;

uniform float uSize;
uniform vec2 uResolution;
uniform float uProgress;

float remap(float value, float originMin, float originMax, float destinationMin, float destinationMax) {
    return destinationMin + (value - originMin) * (destinationMax - destinationMin) / (originMax - originMin);
}

void main() {
    float progress = uProgress * aTimeMultiplier;
    vec3 newPosition = position;

    // Exploding
    float explodingProgress = remap(progress, 0., 0.1, 0., 1.);
    explodingProgress = clamp(explodingProgress, 0., 1.);
    explodingProgress = 1. - pow(1. - explodingProgress, 3.);
    newPosition *= explodingProgress;

    // Falling
    float fallingProgress = remap(progress, 0.1, 1., 0., 1.);
    fallingProgress = clamp(fallingProgress, 0., 1.);
    fallingProgress = 1. - pow(1. - fallingProgress, 3.);
    newPosition.y -= fallingProgress * 0.2;

    // Scaling

    float sizeOpeningProgress = remap(progress, 0., 0.125, 0., 1.);
    float sizeClosingProgress = remap(progress, 0.125, 1., 1., 0.);
    float sizeProgress = min(sizeClosingProgress, sizeOpeningProgress);
    sizeProgress = clamp(sizeProgress, 0., 1.);

    // Twinkling
    float twinklingProgress = remap(progress, 0.2, 0.8, 0., 1.);
    twinklingProgress = clamp(twinklingProgress, 0., 1.);
    float sizeTwinkling = sin(progress * 30.) * 0.5 + 0.5;
    sizeTwinkling = 1. - sizeTwinkling * twinklingProgress;

    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.);
    vec4 viewPosition = viewMatrix * modelPosition;

    gl_Position = projectionMatrix * viewPosition;
    gl_PointSize = uSize * uResolution.y * aSize * sizeProgress * sizeTwinkling;
    gl_PointSize *= 1. / -viewPosition.z;

    if(gl_PointSize < 1.) {
        gl_Position = vec4(9999.9);
    }
}