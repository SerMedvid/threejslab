uniform vec3 uColor;
uniform sampler2D uTexture;
uniform float uIntencity;

varying vec2 vUv;

void main() {
    float distanceToCenter = distance(vUv, vec2(0.5));

    float strength = 1. - distanceToCenter;
    strength = smoothstep(0.5, 0.75, strength);
    strength *= uIntencity;
    vec4 texColor = texture(uTexture, vUv);

    vec3 finalColor = uColor * 10. + (texColor.r * 0.1);

    gl_FragColor = vec4(finalColor, strength);

    gl_FragColor = sRGBTransferOETF(gl_FragColor);

    #include <colorspace_fragment>
}