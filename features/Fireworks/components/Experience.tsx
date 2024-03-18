import { OrbitControls, SoftShadows } from "@react-three/drei";
import Firework from "./Firework";
import { ParkModel } from "./Park";
import Lights from "./Lights";

export default function Experience() {
	return (
		<>
			<color
				args={["#343140"]}
				attach={"background"}
			/>

			<Lights />

			<OrbitControls />
			<Firework />
			<ParkModel position-y={-3} />
			<SoftShadows />
		</>
	);
}
