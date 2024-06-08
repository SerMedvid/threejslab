uniform vec3 color;
uniform sampler2D map;
uniform float spriteRowLenght;

varying float vSprite;
varying float vOpacity;

void main() {
    vec2 texCoord = vec2(gl_PointCoord.x * spriteRowLenght + vSprite, gl_PointCoord.y);

    gl_FragColor = vec4(texture(map, texCoord).xyz * color * vOpacity, 1.0);

    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}