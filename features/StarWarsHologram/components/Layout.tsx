"use client";

import CanvasWrapper from "@/components/CanvasWrapper";
import Experience from "./Experience";

export default function Layout() {
	return (
		<CanvasWrapper camera={{ position: [5.6, 41.8, 52.5] }}>
			<Experience />
		</CanvasWrapper>
	);
}
