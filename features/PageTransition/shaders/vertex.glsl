uniform float uProgress;
uniform vec4 uCorners;
uniform vec2 uResolution;
uniform vec2 uPlaneSize;

varying vec2 vUv;
varying vec2 vSize;
float PI = 3.1415926;

void main() {
    vUv = uv;

    float sine = sin(PI * uProgress);
    float waves = sine * 0.1 * sin(5. * length(uv) + 10. * uProgress);

    vec4 defaultState = modelMatrix * vec4(position, 1.);
    vec4 fullScreenState = vec4(position, 1.);
    fullScreenState.x *= uResolution.x;
    fullScreenState.y *= uResolution.y;
    fullScreenState.z += uCorners.x;

    float cornersProgress = mix(mix(uCorners.z, uCorners.w, uv.x), mix(uCorners.x, uCorners.y, uv.x), uv.y);

    vec4 finalState = mix(defaultState, fullScreenState, cornersProgress + waves);

    vSize = mix(uPlaneSize, uResolution, cornersProgress);
    gl_Position = projectionMatrix * viewMatrix * finalState;
    ;
}