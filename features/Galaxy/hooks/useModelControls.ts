import { useControls } from "leva";

export default function useModalConrols() {
	const controls = useControls("Galaxy configurator", {
		count: {
			value: 300000,
			min: 0,
			max: 1000000,
		},

		radius: {
			value: 5,
			min: 0.1,
			max: 30,
		},
		branches: {
			value: 3,
			min: 2,
			max: 20,
			step: 1,
		},

		randomness: {
			value: 0.5,
			min: 0,
			max: 2,
			step: 0.01,
		},
		randomnessPower: {
			value: 3,
			min: 0,
			max: 8,
			step: 1,
		},
		insideColor: {
			value: "#ff6030",
		},
		outsideColor: {
			value: "#4076ff",
		},
	});

	return controls;
}
