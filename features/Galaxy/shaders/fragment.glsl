varying vec3 vColor;

void main() {
    // float strength = distance(gl_PointCoord, vec2(0.5));
    // strength = step(0.5, strength);
    // strength = 1. - strength;

    //Diffuse
    // float strength = distance(gl_PointCoord, vec2(0.5));
    // strength *= 2.;
    // strength = 1. - strength;

    // Light point
    float strength = distance(gl_PointCoord, vec2(0.5));
    strength = 1. - strength;
    strength = pow(strength, 10.);

    // Final 
    // vec3 finalColor = mix(vec3(0.), vColor, strength);

    // gl_FragColor = vec4(vec3(finalColor), 1.);

    gl_FragColor = vec4(vColor, strength);
}