import { Environment, OrbitControls } from "@react-three/drei";
import { Model } from "./Model";
import { useEffect, useRef } from "react";
import { Mesh } from "three";

export default function Experience() {
	const planeRef = useRef<Mesh>(null);

	useEffect(() => {
		planeRef.current?.lookAt(0, 0, 0);
	}, []);

	return (
		<>
			<OrbitControls />

			<directionalLight
				color={"#ffffff"}
				intensity={4}
				position={[6.25, 3, 4]}
				castShadow
				shadow-mapSize={[1024, 1024]}
				shadow-camera-near={0.1}
				shadow-camera-far={30}
				shadow-normalBias={0.05}
				shadow-camera-top={8}
				shadow-camera-right={8}
				shadow-camera-bottom={-8}
				shadow-camera-left={-8}
			/>

			<Environment
				files={"/assets/SlicedModel/aerodynamics_workshop.hdr"}
				background
				blur={0.5}
			/>

			<mesh
				position={[-4, -3, -4]}
				receiveShadow
				ref={planeRef}
			>
				<planeGeometry args={[10, 10, 10]} />
				<meshStandardMaterial color={"#aaaaaa"} />
			</mesh>

			<Model />
		</>
	);
}
