import { OrbitControls } from "@react-three/drei";
import useMotionPath from "../hooks/useMotionPath";
import Wormhole from "./Wormhole";
import { useFrame } from "@react-three/fiber";
import Objects from "./Objects";
import { ConeGeometry, TorusGeometry } from "three";

const loopTime = 20;

export default function Experience() {
	const motionPath = useMotionPath();

	useFrame(({ camera, clock }) => {
		const elapsedTime = clock.getElapsedTime();
		const time = elapsedTime * 0.5;
		const t = (time % loopTime) / loopTime;

		const pos = motionPath.getPointAt(t);
		const lookAt = motionPath.getPointAt((t + 0.01) % 1);
		camera.position.copy(pos);
		camera.lookAt(lookAt);
	});

	return (
		<>
			<color
				attach="background"
				args={["#000000"]}
			/>

			<fogExp2
				attach="fog"
				args={["#000000", 0.3]}
			/>

			<OrbitControls />

			<Objects
				count={25}
				motionPath={motionPath}
			/>

			<Objects
				count={25}
				motionPath={motionPath}
				baseGeometry={new TorusGeometry(0.075, 0.02, 8, 16)}
			/>

			<Objects
				count={25}
				motionPath={motionPath}
				baseGeometry={new ConeGeometry(0.075, 0.1, 3)}
			/>

			<Wormhole motionPath={motionPath} />
		</>
	);
}
