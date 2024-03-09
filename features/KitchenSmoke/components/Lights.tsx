import React, { useRef } from "react";
import { PointLight } from "three";

export default function Lights() {
	const lightRef = useRef<PointLight>(null);

	return (
		<>
			<ambientLight intensity={0.2} />
			<pointLight
				ref={lightRef}
				castShadow
				shadow-bias={-0.00001}
				distance={8}
				shadow-radius={1.2}
				power={250}
				color={"#fff5b6"}
				position-y={3.5}
			/>
		</>
	);
}
