import { OrbitControls } from "@react-three/drei";
import Constellation from "./Constellation";
import { useControls } from "leva";

export default function Experience() {
	const { count } = useControls({
		count: {
			value: 150,
			min: 1,
			max: 1000,
			step: 1,
		},
	});

	return (
		<>
			<color
				attach="background"
				args={["#06162b"]}
			/>

			<OrbitControls />

			<Constellation count={count} />
		</>
	);
}
