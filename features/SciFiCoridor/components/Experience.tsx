import { Environment, OrbitControls, Stars } from "@react-three/drei";
import { Model } from "./Model";
import Lights from "./Lights";

export default function Experience() {
	return (
		<>
			<color
				args={["#37313d"]}
				attach={"background"}
			/>

			<OrbitControls />

			<Lights />

			<Model position-y={-2} />

			<Stars />

			<Environment
				files={"/assets/SciFiCoridor/peppermint_powerplant_1k.hdr"}
			/>
		</>
	);
}
