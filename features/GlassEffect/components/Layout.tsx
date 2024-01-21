"use client";

import CanvasWrapper from "@/components/CanvasWrapper";
import Experience from "./Experience";
import { ScrollControls } from "@react-three/drei";

export default function Layout() {
	return (
		<CanvasWrapper camera={{ position: [0, 0, 20], fov: 15 }}>
			<ScrollControls
				damping={0.2}
				pages={3}
				distance={0.5}
			>
				<Experience />
			</ScrollControls>
		</CanvasWrapper>
	);
}
