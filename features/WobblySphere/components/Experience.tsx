import { Environment, OrbitControls } from "@react-three/drei";
import Model from "./Model";
import Lights from "./Lights";

export default function Experience() {
	return (
		<>
			<OrbitControls />

			<Lights />

			<Model />

			<Environment
				background
				files={"/assets/WobblySphere/urban_alley_01_1k.hdr"}
			/>
		</>
	);
}
