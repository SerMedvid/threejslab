"use client";

import CanvasWrapper from "@/components/CanvasWrapper";
import Experience from "./Experience";

export default function Layout() {
	return (
		<CanvasWrapper
			shadows
			camera={{ fov: 45, position: [6.2, 2.54, 7.3] }}
		>
			<Experience />
		</CanvasWrapper>
	);
}
