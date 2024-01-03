"use client";

import CanvasWrapper from "@/components/CanvasWrapper";
import Experience from "./Experience";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

export default function Layout() {
	return (
		<CanvasWrapper
			camera={{
				position: [10.4, 8, 5],
				fov: 50,
			}}
		>
			<color
				args={["black"]}
				attach={"background"}
			/>
			<Experience />
			<EffectComposer>
				<Bloom
					mipmapBlur
					luminanceThreshold={1}
					intensity={1.42}
					radius={0.72}
				/>
			</EffectComposer>
		</CanvasWrapper>
	);
}
