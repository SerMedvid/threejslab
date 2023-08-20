"use client";

import CanvasWrapper from "@/components/CanvasWrapper";
import Experience from "../../../features/EarthDayAndNight/components/Experience";
import Overlay from "@/features/EarthDayAndNight/components/Overlay";

export default function Page() {
	return (
		<>
			<Overlay />

			<CanvasWrapper
				camera={{
					position: [0, 15, 50],
					far: 1000,
					near: 0.1,
					fov: 45,
				}}
				shadows
			>
				<Experience />
			</CanvasWrapper>
		</>
	);
}
