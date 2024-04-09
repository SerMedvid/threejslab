uniform sampler2D uTextureStart;
uniform sampler2D uTextureEnd;
uniform sampler2D uTextureProgress;
varying vec2 vUv;

void main(void) {
    vec4 textureStart = texture(uTextureStart, vUv);
    vec4 textureEnd = texture(uTextureEnd, vUv);
    float progress = step(0.01, texture(uTextureProgress, vUv).r);

    gl_FragColor = mix(textureStart, textureEnd, progress);
}