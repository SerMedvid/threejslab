import {
	Center,
	Environment,
	Lightformer,
	SoftShadows,
} from "@react-three/drei";
import { KitchenModel } from "./KitchenModel";
import Lights from "./Lights";
import CameraSetup from "./CameraSetup";

export default function Experience() {
	return (
		<>
			<color
				args={["#18011f"]}
				attach={"background"}
			/>

			<Lights />
			<Center>
				<KitchenModel />
			</Center>

			<SoftShadows />

			<CameraSetup />

			<Environment blur={0.8}>
				<Lightformer
					position={[5, 0, -5]}
					form={"rect"}
					intensity={1}
					color={"white"}
					scale={[3, 5, 1]}
					target={[0, 0, 0]}
				/>

				<Lightformer
					position={[-5, 0, 1]}
					form={"circle"}
					intensity={1}
					color={"#E7C3A7"}
					scale={[2, 5, 1]}
					target={[0, 0, 0]}
				/>

				<Lightformer
					position={[0, 5, -2]}
					form="ring"
					intensity={0.5}
					color="#f0df78"
					scale={[10, 5, 1]}
					target={[0, 0, 0]}
				/>
				<Lightformer
					position={[0, 0, 5]}
					form="rect"
					intensity={0.5}
					color="#fcf2ff"
					scale={[10, 5, 1]}
					target={[0, 0, 0]}
				/>
			</Environment>
		</>
	);
}
