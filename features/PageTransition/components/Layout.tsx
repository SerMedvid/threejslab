"use client";

import CanvasWrapper from "@/components/CanvasWrapper";
import Experience from "./Experience";
import { usePathname } from "next/navigation";

import styles from "./layout.module.css";
import { ScrollControls } from "@react-three/drei";
import data from "../data";

export default function Layout() {
	const pages = data.length / 3 + 0.05;
	const pathname = usePathname();

	return (
		<div
			className={`${styles.container} ${
				pathname === "/lab/page-transition" ? "visible" : "invisible"
			}`}
		>
			<CanvasWrapper withPerf={false}>
				<ScrollControls
					horizontal
					pages={pages}
				>
					<Experience />
				</ScrollControls>
			</CanvasWrapper>
		</div>
	);
}
