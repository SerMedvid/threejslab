import { useFrame } from "@react-three/fiber";
import useStore from "../stores/useStore";

export default function MouseTrack() {
	const { toggleDaytime } = useStore();

	useFrame((state) => {
		const { pointer } = state;

		if (pointer.x < -0.75) toggleDaytime(false);

		if (pointer.x > 0.75) toggleDaytime(true);
	});

	return null;
}
