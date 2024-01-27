import { CameraControls, OrbitControls, Preload } from "@react-three/drei";
import Portal from "./Portal";
import { FishModel } from "./models/FishModel";
import { DragonModel } from "./models/DragonModel";
import { CactoroModel } from "./models/CactoroModel";
import { ElementRef, useEffect, useRef } from "react";
import useStore from "../store/useStore";
import { useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import Cursor from "./Cursor";

export default function Experience() {
	const controlsRef = useRef<ElementRef<typeof CameraControls>>(null);
	const scene = useThree((state) => state.scene);

	useEffect(() => {
		useStore.subscribe(
			(state) => state.active,
			(val) => {
				if (!controlsRef.current) return;

				if (val) {
					const targerPosition = new Vector3();
					scene.getObjectByName(val)?.getWorldPosition(targerPosition);
					controlsRef.current.setLookAt(
						0,
						0,
						5,
						targerPosition.x,
						targerPosition.y,
						targerPosition.y,
						true
					);
				} else {
					controlsRef.current.setLookAt(0, 0, 10, 0, 0, 0, true);
				}
			}
		);
	}, []);

	return (
		<>
			<Cursor />

			<CameraControls
				ref={controlsRef}
				maxPolarAngle={Math.PI / 2}
				minPolarAngle={Math.PI / 3}
			/>

			<Portal
				mapUrl="/assets/PocketmonsterPortals/textures/water.jpg"
				name="Fish King"
				color="#38adcf"
			>
				<FishModel
					position-y={-1}
					scale={0.6}
					name="Fish King"
				/>
			</Portal>
			<Portal
				mapUrl="/assets/PocketmonsterPortals/textures/fire.jpg"
				position-x={-2.5}
				rotation-y={Math.PI / 8}
				name="Dragon"
				color="#df8d52"
			>
				<DragonModel
					position-y={-1}
					scale={0.5}
					name="Dragon"
				/>
			</Portal>
			<Portal
				mapUrl="/assets/PocketmonsterPortals/textures/jungle.jpg"
				position-x={2.5}
				name="Cactoro"
				color="#739d3c"
				rotation-y={-Math.PI / 8}
			>
				<CactoroModel
					position-y={-1}
					scale={0.45}
					name="Cactoro"
				/>
			</Portal>

			<Preload all />
		</>
	);
}
