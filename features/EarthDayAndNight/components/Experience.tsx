"use client";

import { useEnvironment } from "@react-three/drei";
import PlanetScene from "./PlanetScene";
import RingsScene from "./RingsScene";
import MouseTrack from "./MouseTrack";

export default function Experience() {
	const envMap = useEnvironment({
		files: "/assets/EarthDayAndNight/kloofendal_overcast_puresky_2k.hdr",
	});

	return (
		<>
			<PlanetScene envMap={envMap} />
			<RingsScene envMap={envMap} />
			<MouseTrack />
		</>
	);
}
