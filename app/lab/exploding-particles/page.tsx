"use client";

import CanvasWrapper from "@/components/CanvasWrapper";
import Expirience from "@/features/ExpodingParticles/components/Expirience";
import { LinearSRGBColorSpace, NoColorSpace, NoToneMapping } from "three";

export default function Page() {
	return (
		<>
			<CanvasWrapper
				camera={{
					fov: 70,
					near: 0.001,
					far: 5000,
					position: [0, 0, 1500],
				}}
				gl={{
					toneMapping: NoToneMapping,
					outputColorSpace: LinearSRGBColorSpace,
				}}
			>
				<Expirience />
			</CanvasWrapper>
		</>
	);
}
