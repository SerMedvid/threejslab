import { OrbitControls } from "@react-three/drei";
import Models from "./Models";

export default function Experience() {
	return (
		<>
			<color
				args={["#18011f"]}
				attach={"background"}
			/>

			<OrbitControls />
			<Models />
		</>
	);
}
