"use client";

import { Canvas, CanvasProps } from "@react-three/fiber";
import { Perf } from "r3f-perf";

type Props = {
	withPerf?: boolean;
} & CanvasProps;

export default function CanvasWrapper({
	children,
	className,
	withPerf = true,
	...rest
}: Props) {
	return (
		<div className={className || "top-0 left-0 w-full h-full fixed "}>
			<Canvas {...rest}>
				{withPerf && <Perf position="top-left" />}
				{children}
			</Canvas>
		</div>
	);
}
