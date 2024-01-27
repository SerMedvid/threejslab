"use client";

import CanvasWrapper from "@/components/CanvasWrapper";
import Experience from "./Experience";

export default function Layout() {
	return (
		<CanvasWrapper
			shadows
			camera={{ position: [0, 0, 10], fov: 30 }}
		>
			<Experience />
		</CanvasWrapper>
	);
}
