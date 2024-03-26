uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform float uColorOffset;
uniform float uColorMultiplier;
uniform float uLightningIntensity;
uniform float uLightningDecay;

varying float vElevation;
varying vec3 vNormal;
varying vec3 vPosition;

#include "../../../shaders/includes/pointLight.glsl";

void main() {
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    vec3 normal = normalize(vNormal);

    // Base color
    float mixStrength = (vElevation + uColorOffset) * uColorMultiplier;
    mixStrength = smoothstep(0., 1., mixStrength);
    vec3 color = mix(uDepthColor, uSurfaceColor, mixStrength);

     // Light
    vec3 light = vec3(0.);

    light += pointLight(vec3(1.), 10., normal, vec3(0., 0.25, 0.), viewDirection, 30., vPosition, 0.65);

    light += pointLight(vec3(1.), uLightningIntensity, normal, vec3(0., 0.5, 0.), viewDirection, 5., vPosition, uLightningDecay);

    color *= light;

    // Final color
    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}