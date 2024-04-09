uniform vec3 uSunDirection;
uniform vec3 uAtmosphereDayColor;
uniform vec3 uAtmosphereTwilghtColor;

varying vec3 vPosition;
varying vec3 vNormal;

void main() {
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    vec3 normal = normalize(vNormal);
    vec3 color = vec3(0.);

    float sunOrientation = dot(uSunDirection, normal);

    // Atmosphere
    float atmosphereDayMix = smoothstep(-0.5, 1., sunOrientation);
    vec3 atmosphereColor = mix(uAtmosphereTwilghtColor, uAtmosphereDayColor, atmosphereDayMix);
    color += atmosphereColor;

    //Alpha
    float edgeAlpha = dot(viewDirection, normal);
    edgeAlpha = smoothstep(0., 0.5, edgeAlpha);

    float dayAlpha = smoothstep(-0.5, 0., sunOrientation);

    float alpha = edgeAlpha * dayAlpha;

    gl_FragColor = vec4(color, alpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}