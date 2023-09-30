import { useControls } from "leva";

export default function useModalConrols() {
	const controls = useControls("Galaxy configurator static", {
		count: {
			value: 100000,
			min: 0,
			max: 1000000,
		},
		size: {
			value: 0.02,
			min: 0.1,
			max: 2,
		},
		radius: {
			value: 10,
			min: 0.1,
			max: 30,
		},
		branches: {
			value: 3,
			min: 2,
			max: 20,
			step: 1,
		},
		spin: {
			value: 1,
			min: -5,
			max: 5,
		},
		randomness: {
			value: 0.2,
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
			value: "#1b3984",
		},
	});

	return controls;
}
