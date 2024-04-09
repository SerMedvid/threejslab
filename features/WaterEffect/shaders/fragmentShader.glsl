uniform sampler2D uSceneTexture;
uniform sampler2D uMoveTexture;
uniform vec2 uDirection;

varying vec2 vUv;

void main() {
    vec4 displacementTexture = texture(uMoveTexture, vUv);
    vec2 displacedUv = vUv;
    float displacementFactor = displacementTexture.r;

    displacedUv += (displacementFactor * 0.1) * uDirection;

    vec4 texture = texture(uSceneTexture, displacedUv);

    gl_FragColor = texture;
}