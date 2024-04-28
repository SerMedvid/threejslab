import { OrbitControls } from "@react-three/drei";
import Model from "./Model";

export default function Experience() {
	return (
		<>
			<color
				attach={"background"}
				args={["#281f30"]}
			/>

			<OrbitControls />

			{/* <mesh>
				<boxGeometry />
				<meshBasicMaterial color={"red"} />
			</mesh> */}

			<Model />
		</>
	);
}
