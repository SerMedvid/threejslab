import { CameraControls, Stars, Text } from "@react-three/drei";
import EarthStage from "./EarthStage";
import CameraSetup from "./CameraSetup";
import { ElementRef, useEffect, useRef } from "react";

import gsap from "gsap";
import { Group, MeshBasicMaterial } from "three";

export default function Experience() {
	const textRef = useRef<Group>(null);
	const textMaterialRef = useRef<MeshBasicMaterial>(null);
	const cameraRef = useRef<ElementRef<typeof CameraControls>>(null);

	useEffect(() => {
		const runAnimation = async () => {
			if (textRef.current && textMaterialRef.current && cameraRef.current) {
				await gsap
					.timeline()
					.to(textMaterialRef.current, {
						delay: 1.5,
						opacity: 1,
						duration: 0.7,
					})
					.to(
						textRef.current.position,
						{
							y: 1.5,
							duration: 0.7,
						},
						"-=0.7"
					)
					.to(textRef.current.position, {
						y: 1.5,
						delay: 1.5,
					})
					.add(() => {
						cameraRef.current?.setLookAt(5.78, 2.12, -0.91, 0, 0, 0, true);
					})
					.to(textMaterialRef.current, {
						opacity: 0,
						duration: 0.3,
					})
					.add(() => {
						cameraRef.current?.setLookAt(3.46, 1.26, -0.54, 0, 0, 0, true);
					});
			}
		};

		runAnimation();
	}, []);

	return (
		<>
			<color
				// args={["#26132f"]}
				args={["#000000"]}
				attach={"background"}
			/>

			<CameraSetup ref={cameraRef} />

			<EarthStage />

			<group ref={textRef}>
				<Text
					anchorX={"center"}
					anchorY={"bottom"}
					fontSize={2}
					font="/fonts/DMSerifDisplay-Regular.ttf"
					rotation-y={Math.PI}
					position={[0, 0, 3]}
					rotation-x={0.6}
				>
					<meshBasicMaterial
						ref={textMaterialRef}
						color={"white"}
						transparent
						opacity={0}
					/>
					EARTH
				</Text>
			</group>

			<Stars count={100} />
		</>
	);
}
