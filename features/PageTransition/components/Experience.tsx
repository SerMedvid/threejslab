import { useThree } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef } from "react";
import { PerspectiveCamera, PlaneGeometry } from "three";

import {
	PerspectiveCamera as PerspectiveCameraDrei,
	Scroll,
	Text,
} from "@react-three/drei";
import Model from "./Model";
import data from "../data";

const calculateCameraFov = (height: number) =>
	Math.atan(height / 2 / 600) * (180 / Math.PI) * 2;

export default function Experience() {
	const cameraRef = useRef<PerspectiveCamera>(null);

	const { height, width } = useThree((state) => state.size);

	const planeGeometry = useMemo(() => {
		return new PlaneGeometry(1, 1, 50, 100);
	}, []);

	useLayoutEffect(() => {
		if (cameraRef.current) {
			cameraRef.current.fov = calculateCameraFov(height);
		}
	}, [height]);

	return (
		<>
			<color
				args={["black"]}
				attach={"background"}
			/>

			<PerspectiveCameraDrei
				ref={cameraRef}
				position={[0, 0, 600]}
				near={10}
				far={1000}
				fov={calculateCameraFov(height)}
				makeDefault
			/>

			<Text
				fontSize={36}
				position-y={height / 2 - 50}
				position-x={-width / 2 + 25}
				font="/fonts/Inter-Medium.ttf"
				textAlign="left"
				anchorX={"left"}
				anchorY={"top"}
				maxWidth={width - 50}
			>
				Top national parks
			</Text>

			<Scroll>
				{data.map((img, idx) => (
					<Model
						key={img.id}
						{...img}
						index={idx}
						geometry={planeGeometry}
					/>
				))}
			</Scroll>
		</>
	);
}
