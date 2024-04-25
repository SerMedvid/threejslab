"use client";

import CanvasWrapper from "@/components/CanvasWrapper";
import Experience from "./Experience";
import { NoToneMapping } from "three";

export default function Layout() {
	return (
		<CanvasWrapper
			shadows={"soft"}
			camera={{ fov: 45, position: [11.8, 7.3, 9.6] }}
			gl={{ toneMapping: NoToneMapping, alpha: true }}
		>
			<Experience />
		</CanvasWrapper>
	);
}
