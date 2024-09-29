import {
	Environment,
	OrbitControls,
	Preload,
	useHelper,
} from "@react-three/drei";
import Configurator from "./Configurator/Configurator";
import BoardSlider from "./Sliders/BoardSlider/BoardSlider";
import { usePointerMove } from "@/hooks/usePointerMove";
import useStore from "../stores/useStore";
import { Suspense } from "react";

export default function Experience() {
	const setGlobalMovementX = useStore((store) => store.setMovementX);
	const setIsSwiping = useStore((store) => store.setIsSwiping);
	const isTransition = useStore((store) => store.isTransition);

	usePointerMove({
		onMove: (movementX) => {
			if (!isTransition) {
				setGlobalMovementX(movementX);
			}
		},
		onStart: () => {
			if (!isTransition) {
				setIsSwiping(true);
			}
		},
		onEnd: () => {
			setIsSwiping(false);
		},
	});

	return (
		<>
			<Suspense fallback={null}>
				<BoardSlider />
				<Environment preset="warehouse" />
				<ambientLight intensity={0.2} />
				<Configurator />
				<Preload all />
			</Suspense>
		</>
	);
}
