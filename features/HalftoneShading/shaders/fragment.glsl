uniform vec3 uColor;
uniform vec3 uShadowColor;
uniform vec3 uLightColor;
uniform vec2 uResolution;
uniform float uShadowRepetitions;
uniform float uLightRepetitions;

varying vec3 vNormal;
varying vec3 vPosition;

#include "../../../shaders/includes/ambientLight.glsl";
#include "../../../shaders/includes/directionalLight.glsl";
#include "../../../shaders/includes/pointLight.glsl";

vec3 halftone(vec3 color, float repetitions, vec3 direction, float low, float high, vec3 pointColor, vec3 normal) {
    float intensity = dot(normal, direction);
    intensity = smoothstep(low, high, intensity);

    vec2 uv = gl_FragCoord.xy / uResolution.y;
    uv *= repetitions;
    uv = fract(uv);

    float point = distance(vec2(0.5), uv);
    point = 1. - step(0.5 * intensity, point);

    return mix(color, pointColor, point * (pow(intensity, 1. / 3.)));
}

void main() {
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    vec3 normal = normalize(vNormal);
    vec3 color = uColor;

    vec3 directionDown = vec3(0., -1., 0.);
    vec3 directionDirectionLight = vec3(1., 1., 0.);

    // Lights
    vec3 light = vec3(0.);
    light += ambientLight(vec3(1.), 1.);
    light += directionalLight(vec3(1.), 1., normal, directionDirectionLight, viewDirection, 1.);
    color *= light;

    // Halftone
    float low = -0.8;
    float high = 1.5;

    color = halftone(color, uShadowRepetitions, directionDown, low, high, uShadowColor, normal);

    color = halftone(color, uLightRepetitions, directionDirectionLight, 0.5, 1.5, uLightColor, normal);

    // Final color
    gl_FragColor = vec4(color, 1.);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}