uniform float uTime;
uniform float uPositionFrequency;
uniform float uTimeFrequency;
uniform float uStrength;
uniform float uWarpPositionFrequency;
uniform float uWarpTimeFrequency;
uniform float uWarpStrength;

attribute vec4 tangent;

varying vec2 vUv;
varying float vWobble;

#include "glsl-noise/simplex/4d.glsl";

float getWobble(vec3 position) {
    vec3 warpedPosition = position;
    warpedPosition += snoise(vec4(position * uWarpPositionFrequency, uTime * uWarpTimeFrequency)) * uWarpStrength;

    return snoise(vec4(warpedPosition * uPositionFrequency, uTime * uTimeFrequency)) * uStrength;
}

void main() {
    vec3 biTangent = cross(normal, tangent.xyz);

    // Neigbours positions
    float shift = 0.01;
    vec3 positionA = csm_Position + tangent.xyz * shift;
    vec3 positionB = csm_Position + biTangent * shift;

    // Wobble
    float wobble = getWobble(csm_Position);

    csm_Position += wobble * normal;
    positionA += getWobble(positionA) * normal;
    positionB += getWobble(positionB) * normal;

    // Comute normals
    vec3 toA = normalize(positionA - csm_Position);
    vec3 toB = normalize(positionB - csm_Position);

    csm_Normal = cross(toA, toB);

    vUv = uv;
    vWobble = wobble / uStrength;
}