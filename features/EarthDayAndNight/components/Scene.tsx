import { SceneProps } from "@react-three/fiber";
import React from "react";
import { Scene } from "three";

const SceneContainer = React.forwardRef<Scene, SceneProps>(
	({ children, ...rest }, ref) => {
		return (
			<scene
				{...rest}
				ref={ref}
			>
				{children}
			</scene>
		);
	}
);

SceneContainer.displayName = "SceneContainer";

export default SceneContainer;
