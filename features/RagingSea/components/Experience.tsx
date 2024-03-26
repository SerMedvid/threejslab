import { OrbitControls } from "@react-three/drei";
import Sea from "./Sea";
import { useControls } from "leva";
import { BoatModel } from "./BoatModel";
import Rain from "./Rain";

export default function Experience() {
	const { uBigWavesElevation, uBigWavesFrequency, uBigWavesSpeed } =
		useControls({
			uBigWavesElevation: {
				value: 0.15,
				min: 0,
				max: 0.4,
				step: 0.001,
			},
			uBigWavesFrequency: {
				value: [4, 1.5],
				min: [0, 0],
				max: [10, 10],
				step: 0.001,
			},
			uBigWavesSpeed: {
				value: 0.75,
				min: 0,
				max: 4,
				step: 0.001,
			},
		});

	return (
		<>
			<color
				args={["#000000"]}
				attach={"background"}
			/>

			<OrbitControls
				autoRotate
				autoRotateSpeed={0.5}
			/>
			<ambientLight intensity={0.2} />

			<directionalLight
				color={"#151c37"}
				intensity={8}
				position={[2, 2, 0]}
			/>

			<Sea
				uBigWavesElevation={uBigWavesElevation}
				uBigWavesFrequency={uBigWavesFrequency}
				uBigWavesSpeed={uBigWavesSpeed}
			/>

			<BoatModel
				scale={0.04}
				uBigWavesElevation={uBigWavesElevation}
				uBigWavesFrequency={uBigWavesFrequency}
				uBigWavesSpeed={uBigWavesSpeed}
			/>

			<Rain />
		</>
	);
}
