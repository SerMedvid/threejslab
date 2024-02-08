import { Bloom, EffectComposer } from "@react-three/postprocessing";

export default function Effects() {
	return (
		<EffectComposer>
			<Bloom
				mipmapBlur
				luminanceThreshold={1}
				intensity={0.1}
				radius={0.3}
			/>
		</EffectComposer>
	);
}
