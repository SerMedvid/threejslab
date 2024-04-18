uniform sampler2D uTexture;
uniform float uGlitchStrenght;
uniform float uGlitchProgress;

varying vec2 vUv;

float random2D(vec2 value) {
    return fract(sin(dot(value.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
    float glitchStrenght = smoothstep(0.95, 1., 1. - abs(uGlitchProgress - vUv.y)) * uGlitchStrenght;
    glitchStrenght *= 1.25;

    vec2 distortedUv = vUv;

    distortedUv.x += sin(glitchStrenght * 3.);

    distortedUv.y += (random2D(distortedUv.yx + uGlitchProgress) - 0.5) * glitchStrenght * 1.5;

    vec4 texture = texture(uTexture, distortedUv);

    gl_FragColor = texture;

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}