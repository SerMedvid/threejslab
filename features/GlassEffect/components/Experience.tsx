import { Preload, Scroll } from "@react-three/drei";
import { Lens } from "./Lens";
import Images from "./Images";
import Typography from "./Typography";

export default function Experience() {
	return (
		<>
			<color
				attach={"background"}
				args={["#D4D3D3"]}
			/>
			<Scroll>
				<Images />
				<Typography />
			</Scroll>

			<Lens />
			<Preload />
		</>
	);
}
