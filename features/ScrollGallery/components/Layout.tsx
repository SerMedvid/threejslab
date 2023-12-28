"use client";

import CanvasWrapper from "@/components/CanvasWrapper";
import Experience from "./Experience";

export default function Layout() {
	return (
		<CanvasWrapper>
			<color
				attach={"background"}
				args={["black"]}
			/>
			<Experience />
		</CanvasWrapper>
	);
}
