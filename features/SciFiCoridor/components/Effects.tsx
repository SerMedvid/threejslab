import { Bloom, EffectComposer, SSAO } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

export default function Effects() {
	return (
		<EffectComposer enableNormalPass>
			<Bloom />
		</EffectComposer>
	);
}
