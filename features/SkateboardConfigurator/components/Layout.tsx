"use client";

import CanvasWrapper from "@/components/CanvasWrapper";
import Experience from "./Experience";
import Overlay from "./Overlay/Overlay";
import Credits from "@/components/Credits";

export default function Layout() {
	return (
		<section className="touch-none">
			<Overlay />
			<CanvasWrapper
				withPerf={false}
				camera={{
					fov: 45,
					position: [0, 0, 600],
				}}
			>
				<Experience />
			</CanvasWrapper>
			<Credits
				name="Sacha Jerrems"
				href="https://dribbble.com/shots/14078930-Skateboard-configurator"
			/>
		</section>
	);
}
