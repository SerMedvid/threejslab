"use client";

import CanvasWrapper from "@/components/CanvasWrapper";
import Links from "./Links";
import Experience from "./Experience";

import "./layout.css";

export default function Layout() {
	return (
		<div className="bg-indigo-100 min-h-screen">
			<div className="max-w-[1200px] mx-auto px-4 py-16 relative ">
				<p className="text-right text-lg text-gray-600 font-bold uppercase">
					Leonardo AI works
				</p>

				<div>
					<Links />
				</div>
			</div>

			<CanvasWrapper
				id="image-canvas"
				className="pointer-events-none top-0 left-0 w-full h-full fixed"
			>
				<Experience />
			</CanvasWrapper>
		</div>
	);
}
