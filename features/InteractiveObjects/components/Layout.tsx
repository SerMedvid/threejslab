"use client";

import CanvasWrapper from "@/components/CanvasWrapper";
import Experience from "./Experience";
import EffectsContainer from "./EffectsContainer";

export default function Layout() {
	return (
		<CanvasWrapper camera={{ fov: 65, position: [0, 0, -10] }}>
			<Experience />
			<EffectsContainer />
		</CanvasWrapper>
	);
}
