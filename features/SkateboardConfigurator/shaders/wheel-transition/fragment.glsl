uniform sampler2D uStartTexture;
uniform sampler2D uEndTexture;
uniform float uProgress;

varying vec2 vUv;

void main() {
    vec4 texture1 = texture(uStartTexture, vUv);
    vec4 texture2 = texture(uEndTexture, vUv);
    vec3 finalColor = mix(texture1, texture2, uProgress).rgb;

    csm_DiffuseColor = vec4(finalColor, opacity);
    // csm_DiffuseColor = texture1;
}