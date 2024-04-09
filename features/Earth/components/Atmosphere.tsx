import { useRef } from "react";
import {
	BackSide,
	Color,
	Mesh,
	ShaderMaterial,
	SphereGeometry,
	Uniform,
	Vector3,
} from "three";

import vertexShader from "../shaders/atmosphere/vertex.glsl";
import fragmentShader from "../shaders/atmosphere/fragment.glsl";

type Props = {
	geometry: JSX.Element;
	sunDirection: Vector3;
	atmosphereDayColor: string;
	atmosphereTwilghtColor: string;
};

export default function Atmosphere({
	geometry,
	sunDirection,
	atmosphereDayColor,
	atmosphereTwilghtColor,
}: Props) {
	const atmosphereRef = useRef<Mesh<SphereGeometry, ShaderMaterial>>(null);

	return (
		<mesh
			ref={atmosphereRef}
			scale={1.04}
			userData={{ lensflare: "no-occlusion" }}
		>
			{geometry}
			<shaderMaterial
				key={Date.now()}
				side={BackSide}
				transparent
				fragmentShader={fragmentShader}
				vertexShader={vertexShader}
				uniforms={{
					uSunDirection: new Uniform(sunDirection),
					uAtmosphereDayColor: new Uniform(new Color(atmosphereDayColor)),
					uAtmosphereTwilghtColor: new Uniform(
						new Color(atmosphereTwilghtColor)
					),
				}}
			/>
		</mesh>
	);
}
