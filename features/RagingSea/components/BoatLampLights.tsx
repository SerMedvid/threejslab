import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { PointLight } from "three";

export default function BoatLampLights() {
	const light1Ref = useRef<PointLight>(null);
	const light2Ref = useRef<PointLight>(null);

	useFrame(() => {
		if (light1Ref.current && light2Ref.current) {
			const normalIntensity = 0.25;
			const probability = Math.random() * 100;
			const randomStrength = Math.random();

			if (probability < 2) {
				light1Ref.current.power = normalIntensity * randomStrength;
			} else if (probability > 95) {
				light2Ref.current.power = normalIntensity * randomStrength;
			} else {
				light1Ref.current.power = normalIntensity;
				light2Ref.current.power = normalIntensity;
			}
		}
	});

	return (
		<>
			<pointLight
				ref={light1Ref}
				position={[-50.203, -300.607, 84.234]}
				power={0.25}
				color={"yellow"}
			/>

			<pointLight
				ref={light2Ref}
				position={[120.203, 286.607, 84.234]}
				power={0.25}
				color={"yellow"}
			/>
		</>
	);
}
