uniform vec3 uColorA;
uniform vec3 uColorB;

varying vec2 vUv;
varying float vWobble;

void main() {
//     csm_Metalness = step(0., sin(vUv.x * 100. + 0.5));
//     csm_Roughness = 1. - csm_Metalness;

    float colorMix = smoothstep(-1., 1., vWobble);

    csm_DiffuseColor.rgb = mix(uColorA, uColorB, vWobble);

    // Mirror
    // csm_Metalness = step(0.25, vWobble);
    // csm_Roughness = 1. - csm_Metalness;

    // Shinny tio
    csm_Roughness = 1. - colorMix;
}