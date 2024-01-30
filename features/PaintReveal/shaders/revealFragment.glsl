uniform sampler2D uTextureStart;
uniform sampler2D uTextureEnd;
uniform sampler2D uTextureProgress;
varying vec2 vUv;

void main(void) {
    vec4 textureStart = texture2D(uTextureStart, vUv);
    vec4 textureEnd = texture2D(uTextureEnd, vUv);
    float progress = step(0.01, texture2D(uTextureProgress, vUv).r);

    gl_FragColor = mix(textureStart, textureEnd, progress);
}