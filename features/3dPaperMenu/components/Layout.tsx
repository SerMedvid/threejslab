"use client";

import CanvasWrapper from "@/components/CanvasWrapper";
import Experience from "./Experience";
import Credits from "@/components/Credits";

export default function Layout() {
	return (
		<>
			<CanvasWrapper>
				<Experience />
			</CanvasWrapper>

			<Credits
				name="Voicu Apostol"
				href="https://dribbble.com/shots/24067227--Paper-Menu"
			/>
		</>
	);
}
