varying float vRandom;

void main() {
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));

    float strength = 0.4 / distanceToCenter - 0.8;
    vec3 finalColor = mix(vec3(1.), vec3(0.392, 0.196, 0.902), vRandom);

    gl_FragColor = vec4(finalColor, strength * 0.4);
}