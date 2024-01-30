import { Environment, useGLTF } from "@react-three/drei";

export default function Scene() {
	const { scene } = useGLTF("/assets/PaintReveal/city.glb");

	return (
		<>
			<fog
				attach="fog"
				args={["#f0faff", 60, 100]}
			/>
			<color
				attach={"background"}
				args={["#f0faff"]}
			/>
			<Environment preset="city" />
			<primitive object={scene} />
		</>
	);
}
