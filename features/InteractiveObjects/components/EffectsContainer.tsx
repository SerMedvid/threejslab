import { Bloom, EffectComposer } from "@react-three/postprocessing";

export default function EffectsContainer() {
	return (
		<EffectComposer>
			<Bloom intensity={1} />
		</EffectComposer>
	);
}
