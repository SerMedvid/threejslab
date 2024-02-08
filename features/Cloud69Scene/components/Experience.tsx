import {
	Cloud,
	Environment,
	Lightformer,
	OrbitControls,
	Stars,
} from "@react-three/drei";
import { Cloud69 } from "./Cloud69";

export default function Experience() {
	return (
		<>
			<OrbitControls
				autoRotate
				autoRotateSpeed={0.5}
			/>

			<color
				attach={"background"}
				args={["#112253"]}
			/>
			<directionalLight
				position={[-7, 10, -7]}
				scale={2}
				intensity={2.5}
				castShadow
				color={"#7ED7FF"}
				shadow-bias={-0.0004}
			/>

			<Environment blur={1}>
				<Lightformer
					form={"circle"}
					scale={2}
					position={[1, 1, 1]}
					intensity={0.5}
					color={"#7ED7FF"}
				/>

				<Lightformer
					form={"circle"}
					scale={2}
					position={[-1, -1, -1]}
					intensity={0.5}
					color={"#7ED7FF"}
				/>
			</Environment>

			<Stars
				radius={100}
				depth={50}
				count={500}
				factor={4}
				saturation={0}
				fade
				speed={1}
			/>
			<Cloud
				scale={0.75}
				opacity={0.3}
			/>

			<Cloud69 />
		</>
	);
}
