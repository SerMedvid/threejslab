"use client";

import CanvasWrapper from "@/components/CanvasWrapper";
import Experience from "./Experience";
import { ScrollControls } from "@react-three/drei";
import { EffectComposer, Noise } from "@react-three/postprocessing";
import Overlay from "./Overlay";
import useStore from "../stores/useStore";

export default function Layout() {
	const { play, end } = useStore();

	return (
		<>
			<CanvasWrapper>
				<color
					args={["#ececec"]}
					attach={"background"}
				/>
				<ScrollControls
					pages={play && !end ? 20 : 0}
					damping={0.5}
					style={{
						top: "10px",
						left: "0px",
						bottom: "10px",
						right: "10px",
						width: "auto",
						height: "auto",
						animation: "fadein 2.4s ease-in-out 1.2s forwards",
						opacity: 0,
					}}
				>
					<Experience />
				</ScrollControls>
				<EffectComposer>
					<Noise opacity={0.1} />
				</EffectComposer>
			</CanvasWrapper>
			<Overlay />
		</>
	);
}
