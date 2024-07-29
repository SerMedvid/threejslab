uniform sampler2D uTexture;
uniform vec3 uRefColor;
uniform vec2 uTexureResolution;
uniform vec2 uPlaneResolution;
uniform vec2 uPointerCoords;

varying vec2 vUv;

void main() {
    vec2 planeRes = uPlaneResolution; // Screen
    planeRes.x /= 2.;
    vec2 imageRes = uTexureResolution; // Image
    float planeAspect = planeRes.x / planeRes.y;
    float imageAspect = imageRes.x / imageRes.y;
    vec2 new = planeAspect < imageAspect ? vec2(imageRes.x * planeRes.y / imageRes.y, planeRes.y) : vec2(planeRes.x, imageRes.y * planeRes.x / imageRes.x);
    vec2 offset = (planeAspect < imageAspect ? vec2((new.x - planeRes.x) / 2.0, 0.0) : vec2(0.0, (new.y - planeRes.y) / 2.0)) / new;

    vec2 coords = fract(vUv * vec2(2., 1.));
    coords = coords * planeRes / new + offset;

    vec3 color = texture(uTexture, coords).xyz;

    vec2 pointerCoords = (uPointerCoords * 0.5 + 0.5);
    pointerCoords.x *= 2.;
    vec3 sampleColor = uRefColor;

    if(uPointerCoords.x < 0.) {
        sampleColor = texture(uTexture, pointerCoords * planeRes / new + offset).xyz;
    }

    if(vUv.x > 0.5) {
        float luminance = dot(color, vec3(0.2126, 0.7152, 0.0722));

        float colorWeight = dot(normalize(color), normalize(sampleColor));
        colorWeight = pow(colorWeight, 32.);
        color = mix(vec3(luminance), color, colorWeight);
    }

    color = mix(vec3(0.), color, step(0.002, abs(vUv.x - 0.5)));

    gl_FragColor = vec4(color, 1.);
}