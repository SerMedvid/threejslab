import { OrbitControls, Sparkles } from "@react-three/drei";
import { Model } from "./Model";
import Lights from "./Lights";
import CameraControl from "./CameraControl";

export default function Experience() {
	return (
		<>
			<color
				attach="background"
				args={["#1b0d3d"]}
			/>

			<fog
				far={15}
				attach="fog"
				args={["#1b0d3d"]}
			/>

			<CameraControl />

			<Lights />

			<Model />

			<Sparkles
				speed={0.5}
				count={200}
				position-y={1}
				scale={[4, 4, 4]}
			/>

			<mesh rotation-x={-Math.PI / 2}>
				<planeGeometry args={[50, 50]} />
				<meshStandardMaterial color={"#1b0d3d"} />
			</mesh>
		</>
	);
}
