varying vec2 vUv;
uniform sampler2D uTextureStart;
uniform sampler2D uTextureEnd;
uniform sampler2D uTextureDisp;
uniform float uDispFactor;
uniform float uEffectFactor;

void main() {
    vec2 uv = vUv;
    vec4 disp = texture2D(uTextureDisp, uv);
    vec2 distortedPosition = vec2(uv.x + uDispFactor * (disp.r * uEffectFactor), uv.y);
    vec2 distortedPosition2 = vec2(uv.x - (1.0 - uDispFactor) * (disp.r * uEffectFactor), uv.y);
    vec4 _texture = texture2D(uTextureStart, distortedPosition);
    vec4 _texture2 = texture2D(uTextureEnd, distortedPosition2);
    vec4 finalTexture = mix(_texture, _texture2, uDispFactor);
    gl_FragColor = finalTexture;
}