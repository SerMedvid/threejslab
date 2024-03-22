import {
	CameraControls,
	Environment,
	Float,
	MeshReflectorMaterial,
	RenderTexture,
	Text,
	useFont,
} from "@react-three/drei";
import { CampingModel } from "./CampingModel";
import { degToRad } from "three/src/math/MathUtils.js";
import { useCallback, useEffect, useRef } from "react";
import { Color, MathUtils, Mesh, MeshBasicMaterial } from "three";
import { useEventListener, useTimeout } from "ahooks";
import useStore from "../store/useStore";
import { Mesmerized3dPage } from "../types";
import { useFrame } from "@react-three/fiber";

import CameraControlsImpl from "camera-controls";

const bloomColor = new Color("#fff");
bloomColor.multiplyScalar(1.5);

export default function Experience() {
	const controls = useRef<CameraControls>(null);
	const meshFitCameraHome = useRef<Mesh>(null);
	const meshFitCameraCamp = useRef<Mesh>(null);
	const textMaterialRef = useRef<MeshBasicMaterial>(null);
	const setCurrentPage = useStore((state) => state.setCurrentPage);
	const currentPage = useStore((state) => state.currentPage);

	useTimeout(() => {
		setCurrentPage(Mesmerized3dPage.HOME);
	}, 1200);

	const fitCamera = useCallback(async (page: Mesmerized3dPage) => {
		if (!controls.current) return;

		switch (page) {
			case Mesmerized3dPage.HOME:
			case Mesmerized3dPage.INTRO:
				meshFitCameraHome.current &&
					controls.current.fitToBox(meshFitCameraHome.current, true);
				controls.current.smoothTime = 1.6;
				break;
			case Mesmerized3dPage.STORE:
				meshFitCameraCamp.current &&
					controls.current.fitToBox(meshFitCameraCamp.current, true);
				controls.current.smoothTime = 0.8;
				break;
		}
	}, []);

	const intro = useCallback(async () => {
		if (controls.current) {
			controls.current.dolly(-22);
			controls.current.smoothTime = 1.6;

			fitCamera(Mesmerized3dPage.INTRO);
		}
	}, [fitCamera]);

	useEffect(() => {
		intro();
	}, [intro]);

	useEventListener("resize", () => fitCamera(currentPage));

	useEffect(() => {
		useStore.subscribe(
			(store) => store.currentPage,
			(val) => {
				fitCamera(val);
			}
		);
	}, [fitCamera]);

	useFrame((_, delta) => {
		if (textMaterialRef.current) {
			textMaterialRef.current.opacity = MathUtils.lerp(
				textMaterialRef.current.opacity,
				[Mesmerized3dPage.HOME, Mesmerized3dPage.INTRO].includes(currentPage)
					? 1
					: 0,
				delta * 1.5
			);
		}
	});

	return (
		<>
			<CameraControls
				ref={controls}
				maxAzimuthAngle={degToRad(75)}
				minAzimuthAngle={degToRad(-90)}
				maxPolarAngle={degToRad(75)}
				minPolarAngle={degToRad(-90)}
				touches={{
					one: CameraControlsImpl.ACTION.TOUCH_ROTATE,
					two: 0,
					three: 0,
				}}
				mouseButtons={{
					left: CameraControlsImpl.ACTION.ROTATE,
					wheel: 0,
					middle: 0,
					right: 0,
				}}
			/>
			<mesh
				ref={meshFitCameraHome}
				position-z={1.5}
				visible={false}
			>
				<boxGeometry args={[7.5, 2, 2]} />
				<meshBasicMaterial
					color={"orange"}
					transparent
					opacity={0.5}
				/>
			</mesh>
			<Environment preset="sunset" />

			<Text
				font="/fonts/Poppins/Poppins-Black.ttf"
				position={[-1.3, -0.5, 1]}
				lineHeight={0.8}
				textAlign="center"
				rotation-y={degToRad(30)}
				anchorY={"bottom"}
			>
				MY LITTLE{"\n"}CAMPING
				<meshBasicMaterial
					color={bloomColor}
					toneMapped={false}
					ref={textMaterialRef}
				>
					<RenderTexture attach={"map"}>
						<color
							attach={"background"}
							args={["fff"]}
						/>
						<Environment preset="sunset" />
						<Float
							floatIntensity={4}
							rotationIntensity={5}
						>
							<CampingModel
								scale={1.5}
								rotation-y={-degToRad(25)}
								rotation-x={degToRad(40)}
								position-y={-0.5}
							/>
						</Float>
					</RenderTexture>
				</meshBasicMaterial>
			</Text>

			<group
				rotation-y={degToRad(-25)}
				position-x={3}
			>
				<CampingModel
					scale={0.6}
					html={true}
				/>
				<mesh ref={meshFitCameraCamp}>
					<boxGeometry args={[2, 1, 2]} />
					<meshBasicMaterial
						color={"red"}
						opacity={0}
						transparent
					/>
				</mesh>
			</group>

			<mesh
				position-y={-0.48}
				rotation-x={-Math.PI / 2}
			>
				<planeGeometry args={[100, 100]} />
				<MeshReflectorMaterial
					blur={[100, 100]}
					resolution={2048}
					mixBlur={1}
					mixStrength={10}
					roughness={1}
					depthScale={1}
					opacity={0.5}
					transparent
					minDepthThreshold={0.4}
					maxDepthThreshold={1.4}
					color="#333"
					metalness={0.5}
					mirror={1}
				/>
			</mesh>
		</>
	);
}

useFont.preload("/fonts/Poppins/Poppins-Black.ttf");
