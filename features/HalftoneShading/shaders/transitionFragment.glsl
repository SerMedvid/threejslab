uniform sampler2D uStartTexture;
uniform sampler2D uEndTexture;
uniform float uProgress;

varying vec2 vUv;

void main() {
    vec4 startTexture = texture2D(uStartTexture, vUv);
    vec4 endTexture = texture2D(uEndTexture, vUv);

    vec4 finalTexure = mix(startTexture, endTexture, step(1. - uProgress, 1. - vUv.y));

    gl_FragColor = finalTexure;

    // gl_FragColor = vec4(1., 0., 0., 1.);
}