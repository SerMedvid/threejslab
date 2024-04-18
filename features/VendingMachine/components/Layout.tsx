"use client";

import CanvasWrapper from "@/components/CanvasWrapper";
import Experience from "./Experience";

export default function Layout() {
	return (
		<CanvasWrapper
			shadows={"soft"}
			withPerf={false}
		>
			<Experience />
		</CanvasWrapper>
	);
}
