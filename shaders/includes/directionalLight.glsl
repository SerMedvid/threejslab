vec3 directionalLight(vec3 lightColor, float lightIntensity, vec3 normal, vec3 lightPosition, vec3 viewDirection, float specularPower) {
    vec3 lightDirection = normalize(lightPosition);
    vec3 lightReflection = reflect(-lightDirection, normal);

    // Shading
    float shading = dot(normal, lightDirection);
    shading = max(shading, 0.);

    // Specular
    float specular = -dot(lightReflection, viewDirection);
    specular = max(specular, 0.);
    specular = pow(specular, specularPower);

    return lightColor * lightIntensity * (shading + specular);
}