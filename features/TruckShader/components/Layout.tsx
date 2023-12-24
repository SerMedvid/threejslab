"use client";

import CanvasWrapper from "@/components/CanvasWrapper";
import Experience from "./Experience";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

export default function Layout() {
	return (
		<>
			<CanvasWrapper
				shadows
				camera={{ position: [0, 3, 9], fov: 42 }}
			>
				<color
					attach={"background"}
					args={["#15151a"]}
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
		</>
	);
}
