uniform vec3 uColorWaterDeep;
uniform vec3 uColorGrass;
uniform vec3 uColorRock;
uniform vec3 uColorSand;
uniform vec3 uColorSnow;
uniform vec3 uColorWaterSurface;
uniform float uOffset;
uniform float uGrassLevel;

varying vec3 vPosition;
varying float vUpDot;

#include "glsl-noise/simplex/2d.glsl";

void main() {
    vec3 color = vec3(1.);
    float yPosition = vPosition.y + uOffset;

    float surfaceWaterMix = smoothstep(-1., -0.1, yPosition);
    color = mix(uColorWaterDeep, uColorWaterSurface, surfaceWaterMix);

    float sandMix = step(-0.1, yPosition);
    color = mix(color, uColorSand, sandMix);

    float grassMix = step(uGrassLevel, yPosition);
    color = mix(color, uColorGrass, grassMix);

    float rockMix = vUpDot;
    rockMix = 1. - step(0.8, rockMix);
    rockMix *= step(-0.06, yPosition);
    color = mix(color, uColorRock, rockMix);

    float snowThreshold = 0.45;
    snowThreshold += snoise(vPosition.xz * 15.) * 0.1;
    float snowMix = step(snowThreshold, yPosition);
    color = mix(color, uColorSnow, snowMix);

    csm_DiffuseColor = vec4(color, 1.);
}