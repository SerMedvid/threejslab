"use client";

import CanvasWrapper from "@/components/CanvasWrapper";
import Experience from "./Experience";
import { Leva } from "leva";

export default function Layout() {
	return (
		<>
			<CanvasWrapper
				shadows="soft"
				camera={{
					position: [3.9, 1.3, 7.3],
				}}
			>
				<Experience />
			</CanvasWrapper>
			<Leva hidden />
		</>
	);
}
