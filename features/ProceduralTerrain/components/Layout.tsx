"use client";

import CanvasWrapper from "@/components/CanvasWrapper";
import Experience from "./Experience";
import { ScrollControls } from "@react-three/drei";
import { Leva } from "leva";
import Interface from "./Interface";

export default function Layout() {
	return (
		<>
			<CanvasWrapper
				camera={{
					position: [-7.2, 8.2, 9.6],
					fov: 50,
				}}
			>
				<ScrollControls
					pages={8}
					damping={0.1}
				>
					<Experience />
				</ScrollControls>
			</CanvasWrapper>

			<Leva hidden />
		</>
	);
}
