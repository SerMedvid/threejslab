"use client";

import CanvasWrapper from "@/components/CanvasWrapper";
import Experience from "./Experience";

export default function Layout() {
	return (
		<CanvasWrapper
			camera={{
				position: [0, 2.4, -5.2],
			}}
		>
			<Experience />
		</CanvasWrapper>
	);
}
