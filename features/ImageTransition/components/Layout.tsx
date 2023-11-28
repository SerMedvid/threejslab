"use client";

import CanvasWrapper from "@/components/CanvasWrapper";
import Experience from "./Experience";

export default function Layout() {
	return (
		<CanvasWrapper
			camera={{
				position: [0, 0, 8],
				fov: 42,
			}}
		>
			<Experience />
		</CanvasWrapper>
	);
}
