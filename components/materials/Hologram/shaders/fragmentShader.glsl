uniform float time;
uniform vec3 color;

varying vec3 vPosition;
varying vec3 vNormal;

void main() {
    vec3 normal = normalize(vNormal);

    if(!gl_FrontFacing) {
        normal *= -1.;
    }

    float stripes = fract((vPosition.y - time * 0.02) * 20.);
    stripes = pow(stripes, 3.);

    // Fresnel
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    float fresnel = dot(viewDirection, normal) + 1.;
    fresnel = pow(fresnel, 2.);

    float falloff = smoothstep(0.8, 0., fresnel);

    float holographic = stripes * fresnel;
    holographic += fresnel * 1.25;
    holographic *= falloff;

    gl_FragColor = vec4(color, holographic);
    // gl_FragColor = vec4(vNormal, 1.);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}