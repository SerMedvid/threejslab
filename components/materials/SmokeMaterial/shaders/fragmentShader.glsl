uniform sampler2D perlinTexture;
uniform float time;
uniform float speed;
uniform float density;
uniform vec3 color;

varying vec2 vUv;

void main() {
    vec2 smokeUv = vUv;
    smokeUv.x *= 0.5;
    smokeUv.y *= 0.3;
    smokeUv.y -= time * 0.03 * speed;

    float smoke = texture(perlinTexture, smokeUv).r;
    smoke = smoothstep(1. - density, 1., smoke);

    smoke *= smoothstep(0., 0.05, vUv.x);
    smoke *= smoothstep(1., 0.95, vUv.x);
    smoke *= smoothstep(0., 0.1, vUv.y);
    smoke *= smoothstep(1., 0.4, vUv.y);

    gl_FragColor = vec4(color, smoke);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}