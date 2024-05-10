uniform float uPositionFrequency;
uniform float uStrength;
uniform float uWarpFrequency;
uniform float uWarpStrength;
uniform float uTime;

varying vec3 vPosition;
varying float vUpDot;

#include "glsl-noise/simplex/2d.glsl";

float getElevation(vec2 position) {
    vec2 warpedPosition = position;
    warpedPosition += (uTime * 0.2);
    warpedPosition += snoise(warpedPosition * uWarpFrequency * uPositionFrequency) * uWarpStrength;

    float elevation = 0.;
    elevation += snoise(warpedPosition * uPositionFrequency) / 2.;
    elevation += snoise(warpedPosition * uPositionFrequency * 2.) / 4.;
    elevation += snoise(warpedPosition * uPositionFrequency * 4.) / 8.;

    float elevationSign = sign(elevation);
    elevation = pow(abs(elevation), 2.) * elevationSign;

    elevation *= uStrength;

    return elevation;
}

void main() {
    float shift = 0.01;
    vec3 positionA = position + vec3(shift, 0., 0.);
    vec3 positionB = position + vec3(0., 0., -shift);

    positionA.y = getElevation(positionA.xz);
    positionB.y = getElevation(positionB.xz);

    float elevation = getElevation(csm_Position.xz);

    csm_Position.y += elevation;

    vec3 toA = normalize(positionA - csm_Position);
    vec3 toB = normalize(positionB - csm_Position);

    csm_Normal = cross(toA, toB);

    vPosition = csm_Position;
    vPosition.xz += uTime * 0.2;
    vUpDot = dot(csm_Normal, vec3(0., 1., 0.));

}