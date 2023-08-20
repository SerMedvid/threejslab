"use client";

import { Canvas, CanvasProps } from "@react-three/fiber";
import { Perf } from "r3f-perf";

type Props = {
	withPerf?: boolean;
} & CanvasProps;

export default function CanvasWrapper({
	children,
	withPerf = true,
	...rest
}: Props) {
	return (
		<div className="top-0 left-0 w-full h-full fixed ">
			<Canvas
				camera={{
					position: [0, 15, 50],
					far: 1000,
					near: 0.1,
					fov: 45,
				}}
				{...rest}
			>
				{withPerf && <Perf position="top-left" />}
				{children}
			</Canvas>
		</div>
	);
}
