"use client";

import CanvasWrapper from "@/components/CanvasWrapper";
import Experience from "./Experience";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Suspense } from "react";
import Ui from "./Ui";

export default function Layout() {
	return (
		<>
			<CanvasWrapper
				camera={{
					position: [0, 0, 8],
					fov: 42,
				}}
			>
				<fog
					attach={"fog"}
					args={["#171720", 10, 30]}
				/>
				<color
					attach={"background"}
					args={["#171720"]}
				/>
				<Suspense>
					<Experience />
				</Suspense>
				<EffectComposer>
					<Bloom
						mipmapBlur
						intensity={1.2}
					/>
				</EffectComposer>
			</CanvasWrapper>
			<Ui />
		</>
	);
}
