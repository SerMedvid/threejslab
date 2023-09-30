"use client";

import { OrbitControls } from "@react-three/drei";
import Model from "./Model";
import { useControls } from "@/utils";
import ModelStatic from "./ModelStatic";

const OPTIONS = ["animated", "static"] as const;

export default function Experience() {
	const { mode } = useControls("Mode", {
		mode: {
			options: OPTIONS,
		},
	});

	const ModelComponent =
		(mode as unknown as (typeof OPTIONS)[number]) === "animated"
			? Model
			: ModelStatic;

	return (
		<>
			<color
				attach={"background"}
				args={["black"]}
			/>

			<OrbitControls />

			<ModelComponent />
		</>
	);
}
