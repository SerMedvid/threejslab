import { Environment, OrbitControls, Sparkles } from "@react-three/drei";
import { ShamanScene } from "./ShamanScene";
import Lights from "./Lights";

export default function Experience() {
	return (
		<>
			<color
				args={["#343140"]}
				attach={"background"}
			/>

			<OrbitControls
				autoRotate
				autoRotateSpeed={0.5}
			/>

			<ShamanScene position-y={-2} />

			<Lights />

			<Sparkles
				position-y={1}
				scale={[7.5, 4, 7.5]}
				color={"#EDFF85"}
				count={100}
				size={5}
			/>

			<Environment preset="night" />
		</>
	);
}
