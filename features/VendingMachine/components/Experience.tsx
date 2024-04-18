import { Environment, OrbitControls } from "@react-three/drei";
import Lights from "./Lights";
import { VendingMachineScene } from "./VendingMachineScene";
import FireParticles from "./FireParticles";
import CameraSetup from "./CameraSetup";

export default function Experience() {
	return (
		<>
			<color
				attach={"background"}
				args={["#0C090A"]}
			/>

			{/* <OrbitControls /> */}

			<Lights />

			<CameraSetup />

			<VendingMachineScene />

			<Environment preset="night" />
		</>
	);
}
