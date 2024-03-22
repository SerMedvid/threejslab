vec3 pointLight(vec3 lightColor, float lightIntensity, vec3 normal, vec3 lightPosition, vec3 viewDirection, float specularPower, vec3 position, float lightDecay) {
    vec3 lightDelta = lightPosition - position;
    float lightDistance = length(lightDelta);

    vec3 lightDirection = normalize(lightDelta);
    vec3 lightReflection = reflect(-lightDirection, normal);

    // Shading
    float shading = dot(normal, lightDirection);
    shading = max(shading, 0.);

    // Specular
    float specular = -dot(lightReflection, viewDirection);
    specular = max(specular, 0.);
    specular = pow(specular, specularPower);

    // Decay
    float decay = 1. - lightDistance * lightDecay;
    decay = max(0., decay);

    return lightColor * lightIntensity * decay * (shading + specular);
}