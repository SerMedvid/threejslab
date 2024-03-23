uniform sampler2D uTextureStart;
uniform sampler2D uTextureEnd;
uniform float uProgression;
uniform int uTransitionMode;
uniform float uRepeat;
uniform float uSmoothness;

varying vec2 vUv;

#include "../../../shaders/lygia/generative/fbm.glsl";
#include "../../../shaders/lygia/generative/cnoise.glsl";
#include "../../../shaders/lygia/generative/worley.glsl";
#include "../../../shaders/lygia/generative/curl.glsl";

float inverseLerp(float value, float minValue, float maxValue) {
    return (value - minValue) / (maxValue - minValue);
}

float remap(float value, float inMin, float inMax, float outMin, float outMax) {
    float t = inverseLerp(value, inMin, inMax);
    return mix(outMin, outMax, t);
}

void main() {
    vec4 texture1 = texture2D(uTextureStart, vUv);
    vec4 texture2 = texture2D(uTextureEnd, vUv);

    vec4 finalColor;

    float pct = 1.;

    switch(uTransitionMode) {
        case 0:
            pct = fract(vUv.x * uRepeat);
            break;

        case 1:
            pct = fract(vUv.y * uRepeat);
            break;

        case 2:
            pct = fract(vUv.y * uRepeat) * fract(vUv.x * uRepeat);
            break;

        case 3:
            pct = fbm(vUv * uRepeat) * 0.5 + 0.5;
            break;

        case 4:
            pct = cnoise(vUv * uRepeat) * 0.5 + 0.5;
            break;

        case 5:
            pct = worley(vUv * uRepeat) * 0.5 + 0.5;
            break;

        case 6:
            pct = curl(vUv * uRepeat).x * 0.5 + 0.5;
            break;

        case 7:
            pct = fract(vUv.y * uRepeat + vUv.x * uRepeat);
            break;

    }

    float smoothenProgression = remap(uProgression, 0., 1., -uSmoothness / 2., 1. + uSmoothness / 2.);

    pct = smoothstep(smoothenProgression, smoothenProgression + uSmoothness / 2., pct);

    finalColor = mix(texture2, texture1, pct);

    gl_FragColor = finalColor;

    #include <tonemapping_fragment>
    #include <encodings_fragment>
}