import { Bounds, Environment } from "@react-three/drei";
import Model from "./Model";

export default function Experience() {
	return (
		<>
			{/* <OrbitControls /> */}

			<Environment
				files={"/assets/ProceduralTerrain/spruit_sunrise.hdr"}
				background
				blur={0.5}
			/>

			<directionalLight
				color={"#ffffff"}
				intensity={2}
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

			<Bounds
				fit
				observe
				margin={1}
			>
				<Model />
			</Bounds>
		</>
	);
}
