"use client";

import CanvasWrapper from "@/components/CanvasWrapper";
import Experience from "./Experience";

export default function Layout() {
	return (
		<CanvasWrapper
			camera={{
				near: 0.1,
				far: 1000,
				fov: 45,
				position: [0, 0, 20],
			}}
		>
			<Experience />
		</CanvasWrapper>
	);
}
