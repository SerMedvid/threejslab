import { useRef } from "react";
import { DirectionalLight } from "three";

export default function Lights() {
	const lightRef = useRef<DirectionalLight>(null);

	return (
		<>
			<directionalLight
				color={"#506886"}
				castShadow
				intensity={10}
				ref={lightRef}
				position={[2.5, 6.5, -4.5]}
			/>
			<ambientLight intensity={0.2} />
		</>
	);
}
