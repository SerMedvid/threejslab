import { Vector2 } from "three";

export default function Lights() {
	return (
		<directionalLight
			color={"#ffffff"}
			intensity={3}
			position={[0.25, 2, -2.25]}
			castShadow
			shadow-mapSize={new Vector2(1024, 1024)}
			shadow-camera-far={15}
			shadow-camera-normalBias={0.05}
		/>
	);
}
