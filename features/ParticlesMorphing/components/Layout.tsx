"use client";

import CanvasWrapper from "@/components/CanvasWrapper";
import Experience from "./Experience";
import { ScrollControls } from "@react-three/drei";

export default function Layout() {
	return (
		<CanvasWrapper camera={{ position: [0.4, 1.7, 6.8] }}>
			<ScrollControls
				pages={8}
				damping={0.1}
				distance={2}
			>
				<Experience />
			</ScrollControls>
		</CanvasWrapper>
	);
}
