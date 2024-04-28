uniform float uTime;
uniform float uDeltaTime;
uniform float uFlowFieldInfluence;
uniform float uFlowFieldStrength;
uniform float uFlowFieldFrequency;
uniform sampler2D uBase;

#include "glsl-noise/simplex/4d.glsl";

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec4 particle = texture(uParticles, uv);
    vec4 base = texture(uBase, uv);
    float time = uTime * 0.2;

    // Dead
    if(particle.a > 1.) {
        particle.a = mod(particle.a, 1.);
        particle.xyz = base.xyz;

    // Alive
    } else {
        // Strength
        float strenght = snoise(vec4(base.xyz * 0.2, time + 1.));
        float influence = (uFlowFieldInfluence - 0.5) * -2.;
        strenght = smoothstep(influence, 1., strenght);

        // Flow field
        vec3 flowField = vec3(snoise(vec4(particle.xyz * uFlowFieldFrequency + 0., time)), snoise(vec4(particle.xyz * uFlowFieldFrequency + 1., time)), snoise(vec4(particle.xyz * uFlowFieldFrequency + 2., time)));

        flowField = normalize(flowField);
        particle.xyz += flowField * uDeltaTime * strenght * uFlowFieldStrength;

        // Decay
        particle.a += uDeltaTime * 0.3;
    }

    gl_FragColor = particle;
}