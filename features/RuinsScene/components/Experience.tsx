import { OrbitControls } from "@react-three/drei";

import RuinsScene from "./RuinScene";

export default function Experience() {
	return (
		<>
			<OrbitControls maxPolarAngle={Math.PI / 2} />
			<RuinsScene />
		</>
	);
}
