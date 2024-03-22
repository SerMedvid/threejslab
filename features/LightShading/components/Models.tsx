import { useMemo, useRef } from "react";
import { Color, DoubleSide, Euler, Mesh, ShaderMaterial, Uniform } from "three";

import fragmentShader from "../shaders/fragmentShader.glsl";
import vertexShader from "../shaders/vertexShader.glsl";
import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";

export default function Models() {
	const materialRef = useRef<ShaderMaterial>(null);
	const shape1 = useRef<Mesh>(null);
	const shape2 = useRef<Mesh>(null);
	const shape3 = useRef<Mesh>(null);
	const rotationEuler = useRef(new Euler(0, 0, 0));

	const { color } = useControls({
		color: "#ffffff",
	});

	const material = useMemo(() => {
		console.log(fragmentShader);

		return (
			<shaderMaterial
				key={Date.now()}
				uniforms={{
					uColor: new Uniform(new Color(color)),
				}}
				ref={materialRef}
				fragmentShader={fragmentShader}
				vertexShader={vertexShader}
			/>
		);
	}, [color]);

	useFrame(({ clock }) => {
		const { elapsedTime } = clock;

		if (shape1.current && shape2.current && shape3.current) {
			rotationEuler.current.set(-elapsedTime * 0.1, elapsedTime * 0.2, 0);
			shape1.current.quaternion.setFromEuler(rotationEuler.current);
			shape2.current.quaternion.copy(shape1.current.quaternion);
			shape3.current.quaternion.copy(shape1.current.quaternion);
		}
	});

	return (
		<>
			<mesh
				position-x={-3}
				ref={shape1}
			>
				<sphereGeometry />
				{material}
			</mesh>
			<mesh
				position-x={0}
				ref={shape2}
			>
				<torusKnotGeometry args={[0.6, 0.25, 128, 32]} />
				{material}
			</mesh>
			<mesh
				position-x={3}
				ref={shape3}
			>
				<octahedronGeometry />
				{material}
			</mesh>

			{/** Directional light helper */}
			<mesh position={[0, 0, 3]}>
				<planeGeometry />
				<meshBasicMaterial
					side={DoubleSide}
					color={new Color(0.1, 0.1, 1)}
				/>
			</mesh>

			{/** Point light helper */}
			<mesh position={[0, 2.5, 0]}>
				<icosahedronGeometry args={[0.1, 2]} />
				<meshBasicMaterial color={new Color(1, 0.1, 0.1)} />
			</mesh>

			{/** Point light helper 2 */}
			<mesh position={[2, 2, 2]}>
				<icosahedronGeometry args={[0.1, 2]} />
				<meshBasicMaterial color={new Color(0.1, 1, 0.5)} />
			</mesh>
		</>
	);
}
