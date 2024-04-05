uniform sampler2D uBaseTexture;

varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

void main() {
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    vec3 normal = normalize(vNormal);

    float fresnel = dot(viewDirection, normal) + 1.;
    fresnel = smoothstep(0.5, 0.75, fresnel);

    float baseTexture = texture2D(uBaseTexture, vUv).r;

    vec3 color = vec3(0.021, 0.503, 0.503);
    vec3 colorFresnel = vec3(0.434, 1., 0.002);

    color = mix(color, colorFresnel, fresnel);
    color *= 5.;

    color = mix(vec3(1.), color, baseTexture);

    gl_FragColor = vec4(vec3(color), 1.);
}