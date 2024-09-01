import { Environment } from "@react-three/drei";
import { Model } from "./Model";

export default function Experience() {
	return (
		<>
			<color
				attach="background"
				args={["#f0f0f0"]}
			/>
			<Environment preset="apartment" />

			<Model />
		</>
	);
}
