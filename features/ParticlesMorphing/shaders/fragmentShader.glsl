varying vec3 vColor;

void main() {
    vec2 uv = gl_PointCoord;
    float distanceToCenter = distance(vec2(0.5), uv);

    float alpha = 0.05 / distanceToCenter - 0.05 * 2.;

    gl_FragColor = vec4(vColor, alpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}