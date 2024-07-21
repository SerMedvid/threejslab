"use client";

import CanvasWrapper from "@/components/CanvasWrapper";
import Experience from "./Experience";
import EffectsContainer from "./EffectsContainer";

export default function Layout() {
	return (
		<CanvasWrapper>
			<Experience />
			<EffectsContainer />
		</CanvasWrapper>
	);
}
