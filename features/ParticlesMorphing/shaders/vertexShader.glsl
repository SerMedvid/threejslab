uniform float uSize;
uniform vec2 uResolution;
uniform float uProgress;
uniform vec3 uColorA;
uniform vec3 uColorB;

attribute vec3 aPositionTarget;
attribute float aSize;

varying vec3 vColor;

#include "glsl-noise/simplex/3d.glsl";

void main() {
    float noiseOrigin = snoise(position * 0.2);
    float noiseTarget = snoise(aPositionTarget * 0.2);
    float noise = mix(noiseOrigin, noiseTarget, uProgress);
    noise = smoothstep(-1., 1., noise);

    float duration = 0.4;
    float delay = (1. - duration) * noise;
    float end = delay + duration;

    float progress = smoothstep(delay, end, uProgress);
    vec3 mixedPosition = mix(position, aPositionTarget, progress);

    vec4 modelPosition = modelMatrix * vec4(mixedPosition, 1.);
    vec4 viewPosition = viewMatrix * modelPosition;

    gl_Position = projectionMatrix * viewPosition;

    gl_PointSize = aSize * uSize * uResolution.y;
    gl_PointSize *= 1. / -viewPosition.z;

    vColor = mix(uColorA, uColorB, noise);
}
