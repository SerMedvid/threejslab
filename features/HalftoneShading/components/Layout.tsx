"use client";

import CanvasWrapper from "@/components/CanvasWrapper";
import Experience from "./Experience";
import { Leva } from "leva";

export default function Layout() {
	return (
		<>
			<CanvasWrapper>
				<Experience />
			</CanvasWrapper>
			<Leva collapsed />
		</>
	);
}
