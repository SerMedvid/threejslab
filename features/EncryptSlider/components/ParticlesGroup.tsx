import useStore from "../store/useStore";
import BackgroundParticles from "./BackgroundParticles";
import DividerLayer from "./DividerLayer";

export default function ParticlesGroup() {
	const height = useStore((state) => state.height);

	return (
		<>
			<DividerLayer height={height} />
			<group position-z={-0.01}>
				<BackgroundParticles height={height} />
			</group>
		</>
	);
}
