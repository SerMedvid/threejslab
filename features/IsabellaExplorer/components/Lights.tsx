import React from "react";

export default function Lights() {
	return (
		<>
			<ambientLight intensity={0.1} />

			<pointLight
				color={"#ff7d46"}
				position={[0, 2, -2]}
				intensity={10}
				distance={8}
			/>

			<rectAreaLight
				color={"#ffc900"}
				position={[1.21, 1.48, -0.43]}
				rotation={[-2.67, 1.33, -0.25]}
				width={1}
				height={1}
				intensity={1}
			/>
		</>
	);
}
