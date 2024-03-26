void main() {
    float strenght = step(0.9, gl_PointCoord.x);
    strenght *= 0.75;

    gl_FragColor = vec4(vec3(0.85), strenght);
}