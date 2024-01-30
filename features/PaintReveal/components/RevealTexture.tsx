import {
	CameraControls,
	Image,
	PerspectiveCamera,
	RenderTexture,
	useFBO,
	useTexture,
} from "@react-three/drei";
import { createPortal, extend, useFrame, useThree } from "@react-three/fiber";
import { usePersistentTrailTexture } from "../hooks/usePersistentTrailTexture";
import { ElementRef, useEffect, useRef, useState } from "react";
import { RevealMaterial, RevealMaterialT } from "./RevealMaterial";
import { SobelMaterial } from "./SobelMaterial";
import { Scene } from "three";
import { DEG2RAD } from "three/src/math/MathUtils.js";
import { PerspectiveCamera as PerspectiveCameraThree } from "three";

extend({ SobelMaterial, RevealMaterial });

type Props = {
	children: any;
};

export default function RevealTexture({ children }: Props) {
	const { width, height } = useThree((state) => state.viewport);
	const initMask = useTexture("/assets/PaintReveal/texture-mask.jpg");

	const { width: widthSize, height: heightSize } = useThree(
		(state) => state.size
	);

	const sceneTexture = useFBO(widthSize, heightSize);

	const renderCameraRef = useRef<PerspectiveCameraThree>(null);
	const controlsRef = useRef<CameraControls>(null);

	useEffect(() => {
		if (controlsRef.current && renderCameraRef.current) {
			controlsRef.current.camera = renderCameraRef.current;

			controlsRef.current.setLookAt(
				6.409539626978416,
				7.254575459410385,
				29,
				0,
				0,
				0
			);
		}
	}, []);

	const [moveTexture, onMove] = usePersistentTrailTexture({
		intensity: 0.5,
		radius: 0.075,
		smoothing: 0.2,
		interpolate: 1,
		initialTexture: initMask,
		size: 512,
	});
	const revealMaterialRef = useRef<RevealMaterialT>(null);
	const [scene] = useState(() => new Scene());

	useFrame((state) => {
		if (renderCameraRef.current) {
			state.gl.setRenderTarget(sceneTexture);
			state.gl.render(scene, renderCameraRef.current);
			state.gl.setRenderTarget(null);
		}
	});

	return (
		<>
			{createPortal(children, scene)}

			<PerspectiveCamera
				ref={renderCameraRef}
				near={0.5}
				fov={65}
			/>

			<CameraControls
				minPolarAngle={DEG2RAD * 70}
				maxPolarAngle={DEG2RAD * 85}
				minAzimuthAngle={DEG2RAD * -30}
				maxAzimuthAngle={DEG2RAD * 30}
				minDistance={7}
				maxDistance={30}
				ref={controlsRef}
			/>

			<mesh
				onPointerMove={onMove}
				scale={[width, height, 1]}
			>
				<planeGeometry args={[1, 1]} />

				<revealMaterial
					ref={revealMaterialRef}
					uTextureEnd={sceneTexture.texture}
					uTextureProgress={moveTexture}
				>
					<RenderTexture
						attach={"uniforms-uTextureStart-value"}
						sourceFile={undefined}
					>
						<mesh scale={[width, height, 1]}>
							<planeGeometry args={[1, 1]} />
							<sobelMaterial
								uTexture={sceneTexture.texture}
								uWidth={sceneTexture.width}
								uHeight={sceneTexture.height}
							/>
						</mesh>
					</RenderTexture>
				</revealMaterial>
			</mesh>
		</>
	);
}
