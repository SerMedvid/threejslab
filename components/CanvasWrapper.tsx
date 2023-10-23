"use client";

import { Canvas, CanvasProps } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import React from "react";

type Props = {
	withPerf?: boolean;
} & CanvasProps;

export const CanvasWrapper = React.forwardRef<HTMLCanvasElement, Props>(
	({ children, className, withPerf = true, ...rest }, ref) => {
		return (
			<div className={className || "top-0 left-0 w-full h-full fixed "}>
				<Canvas
					{...rest}
					ref={ref}
				>
					{withPerf && <Perf position="top-left" />}
					{children}
				</Canvas>
			</div>
		);
	}
);

CanvasWrapper.displayName = "CanvasWrapper";

export default CanvasWrapper;
