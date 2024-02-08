"use client";

import CanvasWrapper from "@/components/CanvasWrapper";
import Experience from "./Experience";
import Effects from "./Effects";

export default function Layout() {
	return (
		<CanvasWrapper
			withPerf={false}
			shadows
			camera={{
				position: [3.43, 2.5, 6.23],
			}}
		>
			<Experience />
			<Effects />
		</CanvasWrapper>
	);
}
