"use client";

import { ContactShadows, Float, Html, OrbitControls } from "@react-three/drei";
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
					<ContactShadows
						position={[0, -0.8, 0]}
						opacity={0.25}
						scale={10}
						blur={1.5}
						far={0.8}
					/>

					<Html>
						<ClickIndicator />
					</Html>
				</Suspense>
			</Float>
			<ContactShadows
				position={[0, -0.8, 0]}
				opacity={0.25}
				scale={10}
				blur={1.5}
				far={0.8}
			/>

			<OrbitControls
				enableZoom={false}
				enableDamping
			/>
		</>
	);
}
