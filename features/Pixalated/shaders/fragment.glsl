uniform vec2 uPixelRatio;
uniform sampler2D uTexture;
uniform vec2 uTexureResolution;
uniform vec2 uPlaneResolution;

varying vec2 vUv;

void main() {
    vec2 planeRes = uPlaneResolution; // Screen
    vec2 imageRes = uTexureResolution; // Image
    float planeAspect = planeRes.x / planeRes.y;
    float imageAspect = imageRes.x / imageRes.y;
    vec2 new = planeAspect < imageAspect ? vec2(imageRes.x * planeRes.y / imageRes.y, planeRes.y) : vec2(planeRes.x, imageRes.y * planeRes.x / imageRes.x);
    vec2 offset = (planeAspect < imageAspect ? vec2((new.x - planeRes.x) / 2.0, 0.0) : vec2(0.0, (new.y - planeRes.y) / 2.0)) / new;

    vec2 coords = vUv;

    vec2 texUv = floor(coords * uPixelRatio) / uPixelRatio;
    texUv *= planeRes / new + offset;
    vec3 pixalatedColor = texture(uTexture, texUv).xyz;

    vec3 color = pixalatedColor;

    gl_FragColor = vec4(color, 1.0);
}