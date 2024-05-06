"use client";

import CanvasWrapper from "@/components/CanvasWrapper";
import Experience from "./Experience";
import { NoToneMapping } from "three";

export default function Layout() {
	return (
		<CanvasWrapper
			shadows={"soft"}
			camera={{
				position: [7.17, 5.51, -7.83],
			}}
			gl={{ toneMappingExposure: 1, toneMapping: NoToneMapping }}
		>
			<Experience />
		</CanvasWrapper>
	);
}
