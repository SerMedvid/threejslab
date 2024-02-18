uniform bool uDiscardLeft;

varying vec2 vUv;

vec3 colorRing = vec3(0.392, 0.196, 0.902);

void main() {

    if(uDiscardLeft && vUv.x < 0.5) {
        discard;
    }

    vec2 newUv = vUv;
    newUv.y /= 5.;

    vec2 center = vec2(0.5);
    center.y /= 5.;

    float distanceFromCenterCore = distance(newUv, center);
    float distanceFromCenter = distance(vUv, vec2(0.5));

//   float ring = smoothstep(0., 0.2, distanceFromCenterCore);
    float ring = smoothstep(0., 0.1, distanceFromCenterCore);

    vec3 finalColor = vec3(1.);
    finalColor = mix(finalColor, colorRing, ring);

    gl_FragColor = vec4(finalColor, 1. - distanceFromCenter * 2.);
}