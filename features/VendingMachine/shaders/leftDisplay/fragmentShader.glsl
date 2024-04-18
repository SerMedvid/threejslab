uniform sampler2D uTexture1;
uniform sampler2D uTexture2;
uniform float uProgress;

varying vec2 vUv;

void main() {
    float progress = uProgress;

    vec2 distortedUv1 = vec2(vUv.y - progress, vUv.x);
    vec2 distortedUv2 = vec2(vUv.y + (1.0 - progress), vUv.x);

    vec4 texture1 = texture(uTexture1, distortedUv1);
    vec4 texture2 = texture(uTexture2, distortedUv2);

    vec4 finalTexture = mix(texture1, texture2, progress);

    gl_FragColor = finalTexture;

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}