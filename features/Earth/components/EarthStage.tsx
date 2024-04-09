import { useControls } from "leva";
import { useMemo, useState } from "react";
import { Spherical, Vector3 } from "three";
import EarthModel from "./EarthModel";
import Atmosphere from "./Atmosphere";
import Sun from "./Sun";

export default function EarthStage() {
	const [earthGeometry] = useState(() => (
		<sphereGeometry args={[2, 256, 256]} />
	));

	const { phi, theta, atmosphereDayColor, atmosphereTwilghtColor } =
		useControls({
			phi: {
				value: Math.PI / 2,
				min: 0,
				max: Math.PI,
			},
			theta: {
				value: 0.5,
				min: 0,
				max: Math.PI * 2,
			},
			atmosphereDayColor: "#00aaff",
			atmosphereTwilghtColor: "#ff6600",
		});

	const sunDirection = useMemo(() => {
		const spherical = new Spherical(1, phi, theta);
		const vector = new Vector3().setFromSpherical(spherical);

		return vector;
	}, [phi, theta]);

	return (
		<>
			<EarthModel
				geometry={earthGeometry}
				sunDirection={sunDirection}
				atmosphereDayColor={atmosphereDayColor}
				atmosphereTwilghtColor={atmosphereTwilghtColor}
			/>

			<Atmosphere
				geometry={earthGeometry}
				sunDirection={sunDirection}
				atmosphereDayColor={atmosphereDayColor}
				atmosphereTwilghtColor={atmosphereTwilghtColor}
			/>

			<Sun sunDirection={sunDirection} />
		</>
	);
}
