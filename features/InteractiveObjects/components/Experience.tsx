import { Environment, OrbitControls } from "@react-three/drei";
import Objects from "./Objects";
import PlayerObject from "./PlayerObject";
import { Physics, RapierRigidBody } from "@react-three/rapier";
import { useRef } from "react";
import { Vector3 } from "three";
import { useFrame } from "@react-three/fiber";

export default function Experience() {
	const playerPosition = new Vector3();
	const playerObjectRef = useRef<RapierRigidBody>(null);

	useFrame(() => {
		if (playerObjectRef.current) {
			const translation = playerObjectRef.current.translation();

			playerPosition.set(translation.x, translation.y, translation.z);
		}
	});

	return (
		<>
			<color
				attach="background"
				args={["#1b0621"]}
			/>

			<OrbitControls />

			<Environment preset="warehouse" />

			<Physics gravity={[0, 0, 0]}>
				<PlayerObject ref={playerObjectRef} />

				<Objects
					count={200}
					gravityCenter={playerPosition}
				/>
			</Physics>
		</>
	);
}
