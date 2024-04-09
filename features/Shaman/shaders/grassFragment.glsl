precision mediump float;

uniform sampler2D map;
uniform sampler2D alphaMap;
uniform vec3 tipColor;
uniform vec3 bottomColor;

varying vec2 vUv;
varying float frc;

void main() {
    //Get transparency information from alpha map
    float alpha = texture(alphaMap, vUv).r;
    //If transparent, don't draw
    if(alpha < 0.15)
        discard;
    //Get colour data from texture
    vec3 col = vec4(texture(map, vUv)).rgb;

    float remappedFrc = smoothstep(0.4, 0.95, frc + vUv.y);

    //Add more green towards root
    col = mix(tipColor, col, remappedFrc);
    //Add a shadow towards root
    col = mix(bottomColor, col, remappedFrc);

    // col = vec3(remappedFrc, 0., 0.);

    gl_FragColor = vec4(col, 1.);

    #include <tonemapping_fragment>
	#include <colorspace_fragment>
}