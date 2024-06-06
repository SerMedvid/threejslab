uniform sampler2D uTexture;
uniform sampler2D uPrevTexture;
uniform sampler2D uDisplacementTexture;
uniform float uProgression;
uniform int uDirection;

varying vec2 vUv;
varying float vPushed;

float rand(vec2 n) {
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 p) {
    vec2 ip = floor(p);
    vec2 u = fract(p);
    u = u * u * (3.0 - 2.0 * u);

    float res = mix(mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x), mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x), u.y);
    return res * res;
}

float sdRoundedBox(in vec2 p, in vec2 b, in vec4 r) {
    r.xy = (p.x > 0.0) ? r.xy : r.zw;
    r.x = (p.y > 0.0) ? r.x : r.y;
    vec2 q = abs(p) - b + r.x;
    return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r.x;
}

void main() {
    vec2 uv = vUv;
    float noiseFactor = texture(uDisplacementTexture, uv).r;

    vec2 distortedPosition = vec2(uv.x - float(uDirection) * (1. - uProgression) * noiseFactor, uv.y);
    float curTextureR = texture(uTexture, distortedPosition + vec2(vPushed * 0.062)).r;
    float curTextureG = texture(uTexture, distortedPosition + vec2(vPushed * 0.042)).g;
    float curTextureB = texture(uTexture, distortedPosition + vec2(vPushed * -0.032)).b;
    float curTextureA = texture(uTexture, distortedPosition).a;

    vec4 curTexture = vec4(curTextureR, curTextureG, curTextureB, curTextureA);

    vec2 distortedPositionPrev = vec2(uv.x + float(uDirection) * uProgression * noiseFactor, uv.y);
    vec4 prevTexture = texture(uPrevTexture, distortedPositionPrev);

    vec4 finalTexture = mix(prevTexture, curTexture, uProgression);

    vec2 centeredUv = (vUv - 0.5) * 2.0;
    float mask = sdRoundedBox(centeredUv, vec2(1.), vec4(0.2, 0., 0., 0.2));
    mask = smoothstep(0.0, 0.002, -mask);
    finalTexture.a *= mask;

    gl_FragColor = finalTexture;

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}