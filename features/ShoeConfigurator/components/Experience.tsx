"use client";

import { Float, Html, OrbitControls } from "@react-three/drei";
import { ShoeModel } from "./ShoeModel";
import ClickIndicator from "./ClickIndicator";
import { Suspense } from "react";

export default function Experience() {
	return (
		<>
			<ambientLight intensity={3} />

			<Float>
				<Suspense fallback={null}>
					<ShoeModel />
					<Html>
						<ClickIndicator />
					</Html>
				</Suspense>
			</Float>

			<OrbitControls
				enableZoom={false}
				enableDamping
			/>
		</>
	);
}
