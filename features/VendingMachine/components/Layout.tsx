"use client";

import CanvasWrapper from "@/components/CanvasWrapper";
import Experience from "./Experience";
import { Suspense } from "react";
import Loader from "./Loader";

export default function Layout() {
	return (
		<CanvasWrapper
			shadows={"soft"}
			withPerf={false}
			camera={{
				position: [16.7, 21.6, 24.8],
			}}
		>
			<Suspense>
				<Experience />
			</Suspense>
			<Loader />
		</CanvasWrapper>
	);
}
