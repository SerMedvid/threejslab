uniform vec3 uColor;

varying vec3 vNormal;
varying vec3 vPosition;

#include "../../../shaders/includes/ambientLight.glsl";
#include "../../../shaders/includes/directionalLight.glsl";
#include "../../../shaders/includes/pointLight.glsl";

void main() {
    vec3 normal = normalize(vNormal);
    vec3 color = uColor;
    vec3 viewDirection = normalize(vPosition - cameraPosition);

    // Light
    vec3 light = vec3(0.);
    light += ambientLight(vec3(1.), 0.03);
    light += directionalLight(vec3(0.1, 0.1, 1), 1., normal, vec3(0., 0., 3.), viewDirection, 20.);

    light += pointLight(vec3(1., 0.1, 0.1), 1., normal, vec3(0., 2.5, 0.), viewDirection, 20., vPosition, 0.25);

    light += pointLight(vec3(0.1, 1., 0.5), 1., normal, vec3(2., 2., 2.), viewDirection, 20., vPosition, 0.2);

    color *= light;

    gl_FragColor = vec4(light, 1.);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}