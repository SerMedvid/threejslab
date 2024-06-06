"use client";

import CanvasWrapper from "@/components/CanvasWrapper";
import Experience from "./Experience";
import Slider from "./Slider";

export default function Layout() {
	return (
		<>
			<Slider />
			<CanvasWrapper
				withPerf={false}
				camera={{ position: [0, 0, 5], fov: 30 }}
			>
				<Experience />
			</CanvasWrapper>
		</>
	);
}
