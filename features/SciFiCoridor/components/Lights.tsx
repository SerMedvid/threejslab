import { useHelper } from "@react-three/drei";
import React, { useRef } from "react";
import { DirectionalLight, DirectionalLightHelper, RectAreaLight } from "three";
import { RectAreaLightHelper } from "three/examples/jsm/Addons.js";

export default function Lights() {
	const directionalLightRef = useRef<DirectionalLight>(null);
	const rectlLightRef = useRef<RectAreaLight>(null);
	const rectlLightRef2 = useRef<RectAreaLight>(null);
	const rectlLightRef3 = useRef<RectAreaLight>(null);
	const rectlLightRef4 = useRef<RectAreaLight>(null);

	// useHelper(directionalLightRef, DirectionalLightHelper);
	// useHelper(rectlLightRef, RectAreaLightHelper);
	// useHelper(rectlLightRef2, RectAreaLightHelper);
	// useHelper(rectlLightRef3, RectAreaLightHelper);
	// useHelper(rectlLightRef4, RectAreaLightHelper);

	return (
		<>
			{/* <ambientLight intensity={0.2} /> */}

			<directionalLight
				castShadow
				position={[0, 5.5, 0]}
				scale={1.5}
				intensity={5}
				ref={directionalLightRef}
			/>

			<rectAreaLight
				rotation-x={-Math.PI / 2}
				color={"#00AFFE"}
				position={[-2, 5.5, 2]}
				width={2}
				height={2}
				intensity={4}
				ref={rectlLightRef}
			/>

			<rectAreaLight
				rotation-x={-Math.PI / 2}
				color={"#00AFFE"}
				position={[-2, 5.5, -2]}
				width={2}
				height={2}
				intensity={4}
				ref={rectlLightRef2}
			/>

			<rectAreaLight
				rotation-x={-Math.PI / 2}
				color={"#00AFFE"}
				position={[2, 5.5, 2]}
				width={2}
				height={2}
				intensity={4}
				ref={rectlLightRef3}
			/>

			<rectAreaLight
				rotation-x={-Math.PI / 2}
				color={"#00AFFE"}
				position={[2, 5.5, -2]}
				width={2}
				height={2}
				intensity={4}
				ref={rectlLightRef4}
			/>

			{/* <rectAreaLight
				ref={directionalLightRef}
				intensity={2000}
				position={[0, 4, 0]}
			/> */}
		</>
	);
}
