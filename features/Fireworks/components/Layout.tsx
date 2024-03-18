"use client";

import CanvasWrapper from "@/components/CanvasWrapper";
import Experience from "./Experience";
import useStore from "../stores/useStore";

export default function Layout() {
	const setClicked = useStore((state) => state.setClicked);

	return (
		<CanvasWrapper
			withPerf={false}
			shadows
			camera={{ fov: 55, position: [6, 4, 9.5] }}
			onPointerDown={() => setClicked(true)}
			onPointerUp={() => setClicked(false)}
		>
			<Experience />
		</CanvasWrapper>
	);
}
