"use client";

import CanvasWrapper from "@/components/CanvasWrapper";
import Experience from "./Experience";

export default function Layout() {
	return (
		<CanvasWrapper
			withPerf={false}
			camera={{ fov: 45 }}
		>
			<Experience />
		</CanvasWrapper>
	);
}
