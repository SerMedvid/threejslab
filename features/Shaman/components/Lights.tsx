import { useControls } from "leva";
import { useRef } from "react";
import { DirectionalLight } from "three";

export default function Lights() {
	const lightRef = useRef<DirectionalLight>(null);

	const {
		directionalLightPosition,
		directionalLightColor,
		pointLightPosition,
		pointLightPower,
		pointLightColor,
	} = useControls({
		directionalLightPosition: [4, 8, -2],
		directionalLightColor: "#2f2372",
		pointLightPosition: [0, 5, -2],
		pointLightColor: "#EDFF85",
		pointLightPower: 400,
	});

	return (
		<>
			<directionalLight
				ref={lightRef}
				color={directionalLightColor}
				intensity={8}
				position={directionalLightPosition}
			/>

			<ambientLight
				intensity={0.8}
				color={"#624CDD"}
			/>

			<pointLight
				color={pointLightColor}
				castShadow
				power={pointLightPower}
				position={pointLightPosition}
			/>
		</>
	);
}
