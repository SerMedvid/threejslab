import { Points } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { Cylindrical, ShaderMaterial, Uniform, Vector3 } from "three";

import fragmentShader from "../shaders/rainFragment.glsl";
import vertexShader from "../shaders/rainVertex.glsl";
import { useFrame } from "@react-three/fiber";

const COUNT = 2000;

export default function Rain() {
	const shaderRef = useRef<ShaderMaterial>(null);

	const { positionArray, velocityArray } = useMemo(() => {
		const positionArray = new Float32Array(COUNT * 3);
		const velocityArray = new Float32Array(COUNT);

		const cylindr = new Cylindrical();
		const particlesPosition = new Vector3();

		for (let i = 0; i < COUNT; i++) {
			const i3 = i * 3;

			cylindr.set(
				Math.random() * 2,
				Math.random() * Math.PI * 2,
				Math.random() * 3
			);
			particlesPosition.setFromCylindrical(cylindr);

			velocityArray[i] = Math.random() + 1;

			positionArray[i3] = particlesPosition.x;
			positionArray[i3 + 1] = particlesPosition.y;
			positionArray[i3 + 2] = particlesPosition.z;
		}

		return {
			positionArray,
			velocityArray,
		};
	}, []);

	useFrame((_, delta) => {
		if (shaderRef.current) {
			shaderRef.current.uniforms.uTime.value += delta;
		}
	});

	return (
		<Points positions={positionArray}>
			<bufferAttribute
				attach={"geometry-attributes-aVelocity"}
				args={[velocityArray, 1]}
			/>

			<shaderMaterial
				ref={shaderRef}
				key={Date.now()}
				fragmentShader={fragmentShader}
				vertexShader={vertexShader}
				uniforms={{
					uTime: new Uniform(0),
				}}
			/>
		</Points>
	);
}
