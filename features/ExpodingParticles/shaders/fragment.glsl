uniform float uProgress;
uniform sampler2D uTStart;
uniform sampler2D uTEnd;

varying vec2 vUv;
varying vec3 vPosition;

float PI = 3.141592653589793;

void main() {
    // vec2 newUV = vPosition.xy / vec2(480. * 1.5, 820. * 1.5) + vec2(0.5);
    // gl_FragColor = vec4(1., 0., 0., 1.);
    vec4 ttStart = texture2D(uTStart, vUv);
    vec4 ttEnd = texture2D(uTEnd, vUv);
    // gl_FragColor = vec4(vUv, 0., 1.);

    vec4 finalTexture = mix(ttStart, ttEnd, uProgress);
    gl_FragColor = finalTexture;

    if(gl_FragColor.r < 0.1 && gl_FragColor.b < 0.1 && gl_FragColor.g < 0.1)
        discard;
}