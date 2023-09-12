"use client";

import CanvasWrapper from "@/components/CanvasWrapper";
import Experience from "@/features/InteractiveParticles/components/Experience";

export default function Page() {
	return (
		<CanvasWrapper
			camera={{
				fov: 50,
				near: 0.001,
				far: 2000,
				position: [0, 0, 640],
			}}
		>
			<Experience />
		</CanvasWrapper>
	);
}
