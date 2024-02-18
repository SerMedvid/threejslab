uniform float uOpacity;

varying float vTreveledDistance;

void main() {

    if(length(gl_PointCoord - vec2(0.5)) >= 0.5) {
        discard;
    }

    float alpha = (1. - vTreveledDistance) * uOpacity;

    gl_FragColor = vec4(1., 1., 1., alpha);
}