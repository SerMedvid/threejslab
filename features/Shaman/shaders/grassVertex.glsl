precision mediump float;

attribute vec3 offset;
attribute vec4 orientation;
attribute float halfRootAngleSin;
attribute float halfRootAngleCos;
attribute float stretch;

uniform float time;
uniform float bladeHeight;
uniform sampler2D perlinTexture;

varying vec2 vUv;
varying float frc;

//https://www.geeks3d.com/20141201/how-to-rotate-a-vertex-by-a-quaternion-in-glsl/
vec3 rotateVectorByQuaternion(vec3 v, vec4 q) {
    return 2.0 * cross(q.xyz, v * q.w + cross(q.xyz, v)) + v;
}

//https://en.wikipedia.org/wiki/Slerp
vec4 slerp(vec4 v0, vec4 v1, float t) {
    // Only unit quaternions are valid rotations.
    // Normalize to avoid undefined behavior.
    normalize(v0);
    normalize(v1);

    // Compute the cosine of the angle between the two vectors.
    float dot_ = dot(v0, v1);

    // If the dot product is negative, slerp won't take
    // the shorter path. Note that v1 and -v1 are equivalent when
    // the negation is applied to all four components. Fix by 
    // reversing one quaternion.
    if(dot_ < 0.0) {
        v1 = -v1;
        dot_ = -dot_;
    }

    const float DOT_THRESHOLD = 0.9995;
    if(dot_ > DOT_THRESHOLD) {
          // If the inputs are too close for comfort, linearly interpolate
          // and normalize the result.
        vec4 result = t * (v1 - v0) + v0;
        normalize(result);
        return result;
    }

    // Since dot is in range [0, DOT_THRESHOLD], acos is safe
    float theta_0 = acos(dot_);       // theta_0 = angle between input vectors
    float theta = theta_0 * t;          // theta = angle between v0 and result
    float sin_theta = sin(theta);     // compute this value only once
    float sin_theta_0 = sin(theta_0); // compute this value only once
    float s0 = cos(theta) - dot_ * sin_theta / sin_theta_0;  // == sin(theta_0 - theta) / sin(theta_0)
    float s1 = sin_theta / sin_theta_0;
    return (s0 * v0) + (s1 * v1);
}

void main() {
    //Relative position of vertex along the mesh Y direction
    frc = position.y / float(bladeHeight);
    //Get wind data from simplex noise 

    float noise = texture(perlinTexture, vec2(vec2((time * 0.8 - offset.x / 50.), (time * 0.8 - offset.z / 50.)))).r;

    //Define the direction of an unbent blade of grass rotated around the Y axis
    vec4 direction = vec4(0.0, halfRootAngleSin, 0.0, halfRootAngleCos);

    //Interpolate between the unbent direction and the direction of growth calculated on the CPU. 
    //Using the relative location of the vertex along the Y axis as the weight, we get a smooth bend
    direction = slerp(direction, orientation, frc);
    vec3 vPosition = vec3(position.x, position.y + position.y * stretch, position.z);
    vPosition = rotateVectorByQuaternion(vPosition, direction);

    //Apply wind
    float halfAngle = noise - 0.5;
    vPosition = rotateVectorByQuaternion(vPosition, normalize(vec4(sin(halfAngle), 0.0, -sin(halfAngle), cos(halfAngle))));
    //UV for texture
    vUv = uv;
    //Calculate final position of the vertex from the world offset and the above shenanigans 
    gl_Position = projectionMatrix * modelViewMatrix * vec4(offset + vPosition, 1.0);
}