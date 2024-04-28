"use client";

import CanvasWrapper from "@/components/CanvasWrapper";
import Experience from "./Experience";
import { NoToneMapping } from "three";

export default function Layout() {
	return (
		<CanvasWrapper
			gl={{ toneMapping: NoToneMapping }}
			camera={{
				position: [8.9, 4.27, 7.8],
			}}
		>
			<Experience />
		</CanvasWrapper>
	);
}
