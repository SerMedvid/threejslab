"use client";

import CanvasWrapper from "@/components/CanvasWrapper";
import React from "react";
import Experience from "./Experience";
import { Leva } from "leva";
import Overlay from "./Overlay";

export default function Layout() {
	return (
		<>
			<Leva />
			<Overlay />
			<CanvasWrapper
				shadows
				camera={{ position: [0, 0, 5], fov: 30 }}
			>
				<color
					attach={"background"}
					args={["#ececec"]}
				/>
				<Experience />
			</CanvasWrapper>
		</>
	);
}
