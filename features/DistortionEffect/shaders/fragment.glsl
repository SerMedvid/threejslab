uniform sampler2D uTexture;
uniform sampler2D uMaps;
uniform vec2 uTextureSize;
uniform vec2 uResolution;
uniform float uTime;
uniform vec2 uMouse;

varying vec2 vUv;

float PI = 3.141592653589793;

vec2 getFullScreenUv(vec2 uv, vec2 textureSize, vec2 quadSize) {
    vec2 tempUv = uv - vec2(0.5);

    float textureAspect = textureSize.x / textureSize.y;
    float quadAspect = quadSize.x / quadSize.y;

    if(quadAspect < textureAspect) {
        tempUv *= vec2(quadAspect / textureAspect, 1.);
    } else {
        tempUv *= vec2(1., textureAspect / quadAspect);
    }

    return tempUv += vec2(0.5);
}

float wave(float direction, float freq, float speed) {
    return sin(direction * freq + (uTime * PI * 0.5) * speed);
}

vec2 waves(vec2 position, bool masked) {
    float mask = texture2D(uMaps, position).b;

    vec2 intensity = vec2(2., 1.) * 1. / uResolution;

    vec2 directionalWaves = vec2(wave(position.y, 190., 0.35), wave(position.x, 100., 0.4));

    return position + directionalWaves * intensity * (masked ? mask : 1.);
}

vec2 depth(vec2 position) {
    vec2 intensity = vec2(0.004);
    float d = 0. - pow(texture2D(uMaps, position).r, 1.);

    return position + intensity * uMouse * d;
}

void main() {
    vec2 newUv = getFullScreenUv(vUv, uTextureSize, uResolution);

    vec2 turbulance = waves(depth(newUv), true);

    vec4 image = texture2D(uTexture, turbulance);

    gl_FragColor = vec4(image.rgb, 1.);
}