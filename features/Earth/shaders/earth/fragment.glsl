uniform sampler2D uDayTexture;
uniform sampler2D uNightTexture;
uniform sampler2D uSpecularCloudsTexture;
uniform sampler2D uPerlinTexture;
uniform vec3 uSunDirection;
uniform vec3 uAtmosphereDayColor;
uniform vec3 uAtmosphereTwilghtColor;
uniform float uTime;

varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vUv;

void main() {
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    vec3 normal = normalize(vNormal);
    vec3 color = vec3(0.);

    float sunOrientation = dot(uSunDirection, normal);

    float dayMix = smoothstep(-0.25, 0.5, sunOrientation);
    vec3 dayColor = texture(uDayTexture, vUv).rgb;
    vec3 nightColor = texture(uNightTexture, vUv).rgb;
    color += mix(nightColor, dayColor, dayMix);

    vec2 specularCloudsColor = texture(uSpecularCloudsTexture, vUv).rg;

    // Clouds
    float cloudNoise = texture(uPerlinTexture, vec2(uTime * 0.05, uTime * 0.01)).r;
    float cloudColor = texture(uSpecularCloudsTexture, vec2(vUv.x + uTime * 0.005, vUv.y)).g;

    float cloudsMix = smoothstep(cloudNoise, 1., cloudColor);
    cloudsMix *= dayMix;
    color = mix(color, vec3(1.), cloudsMix);

    // Fresnel
    float fresnel = dot(viewDirection, normal) + 1.;
    fresnel = pow(fresnel, 2.);

    // Atmosphere
    float atmosphereDayMix = smoothstep(-0.5, 1., sunOrientation);
    vec3 atmosphereColor = mix(uAtmosphereTwilghtColor, uAtmosphereDayColor, atmosphereDayMix);
    color = mix(color, atmosphereColor, fresnel * atmosphereDayMix);

    // Specular
    vec3 reflection = reflect(-uSunDirection, normal);
    float specular = -dot(reflection, viewDirection);
    specular = max(specular, 0.);
    specular = pow(specular, 32.);
    specular *= specularCloudsColor.r;

    vec3 specularColor = mix(vec3(1.), atmosphereColor, fresnel);

    color += specular * specularColor;

    gl_FragColor = vec4(color, 1.);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}