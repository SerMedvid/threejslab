import { OrbitControls } from "@react-three/drei";
import Models from "./Models";

export default function Experience() {
	return (
		<>
			<color
				args={["#281f30"]}
				attach={"background"}
			/>

			<OrbitControls />

			<Models />
		</>
	);
}
