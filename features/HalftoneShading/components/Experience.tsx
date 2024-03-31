import { Environment, OrbitControls } from "@react-three/drei";
import { Leva, useControls } from "leva";
import TransitionEffect from "./TransitionEffect";

export default function Experience() {
	const { clearColor } = useControls({
		clearColor: {
			value: "#26132f",
		},
	});

	return (
		<>
			<color
				args={[clearColor]}
				attach={"background"}
			/>

			<TransitionEffect />

			<Environment preset="city" />
		</>
	);
}
