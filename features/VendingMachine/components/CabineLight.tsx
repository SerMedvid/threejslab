import { useHelper } from "@react-three/drei";
import { useControls } from "leva";
import { useRef } from "react";
import { RectAreaLight } from "three";
import { RectAreaLightHelper } from "three/addons/helpers/RectAreaLightHelper.js";

export default function CabineLight() {
	const ref = useRef<RectAreaLight>(null);

	// useHelper(ref, RectAreaLightHelper);

	// const { position, rotation, height, width, intensity } = useControls({
	// 	position: [0, 2, 2],
	// 	rotation: [0, 0, 0],
	// 	height: 2,
	// 	width: 2,
	// 	intensity: 150,
	// });

	return (
		<rectAreaLight
			// rotation-y={Math.PI}
			ref={ref}
			color={"#a8e4ff"}
			intensity={10}
			width={3.9}
			height={1.9}
			position={[0, 4, 3.4]}
			rotation={[-1, 0, 0]}
		/>
	);
}
