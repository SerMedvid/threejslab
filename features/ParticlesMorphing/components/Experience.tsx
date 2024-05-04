import { Stars } from "@react-three/drei";
import Models from "./Models";

export default function Experience() {
	return (
		<>
			<color
				args={["#281f30"]}
				attach={"background"}
			/>

			<Stars count={2000} />

			<Models />
		</>
	);
}
