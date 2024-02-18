"use client";

import CanvasWrapper from "@/components/CanvasWrapper";
import Experience from "./Experience";

export default function Layout() {
	return (
		<div className="bg-black h-full">
			<div
				className="h-full"
				style={{
					background:
						"radial-gradient(140% 107.13% at 50% 10%,transparent 37.41%,#63e 69.27%,#fff 100%)",
				}}
			>
				<CanvasWrapper gl={{ alpha: true }}>
					<Experience />
				</CanvasWrapper>
			</div>
		</div>
	);
}
