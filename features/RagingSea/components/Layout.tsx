"use client";

import CanvasWrapper from "@/components/CanvasWrapper";
import Experience from "./Experience";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

export default function Layout() {
	return (
		<CanvasWrapper
			camera={{
				position: [-1, 1.2, -1.4],
			}}
		>
			<Experience />

			<EffectComposer>
				<Bloom />
			</EffectComposer>
		</CanvasWrapper>
	);
}
