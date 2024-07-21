import { Effects } from "@react-three/drei";
import { extend, useThree } from "@react-three/fiber";
import { Vector2 } from "three";

import { UnrealBloomPass } from "three-stdlib";

extend({ UnrealBloomPass });

declare global {
	namespace JSX {
		interface IntrinsicElements {
			unrealBloomPass: Partial<UnrealBloomPass>;
		}
	}
}

export default function EffectsContainer() {
	const { width, height } = useThree((state) => state.size);

	return (
		<Effects>
			<unrealBloomPass
				threshold={0.002}
				strength={2.5}
				radius={0}
				resolution={new Vector2(width, height)}
			/>
		</Effects>
	);
}
