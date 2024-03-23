"use client";

import {
	CameraControls,
	Environment,
	PerspectiveCamera,
	useFBO,
	useGLTF,
} from "@react-three/drei";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import {
	SceneTransitionMaterial,
	SceneTransitionMaterialT,
} from "./SceneTransitionMaterial";
import { useEffect, useRef, useState } from "react";
import {
	Group,
	MathUtils,
	Mesh,
	MeshStandardMaterial,
	Object3D,
	PerspectiveCamera as PerspectiveCameraThree,
} from "three";
import { GLTF } from "three-stdlib";
import { DEG2RAD } from "three/src/math/MathUtils.js";

extend({ SceneTransitionMaterial });

enum Transition {
	VERTICAL = 0,
	HORIZONTAL = 1,
	MIXED = 2,
	FBM = 3,
	C_NOISE = 4,
	WORLEY = 5,
	CURL = 6,
	DIAGONAL = 7,
	FADEIN = 10,
}

type GLTFResult = GLTF & {
	nodes: {
		Ceiling_Ceiling_0: Mesh;
		Counters_Counter_0: Mesh;
		Cupboard: Mesh;
		Floor: Mesh;
		Fridge_Counter_0: Mesh;
		Fridge_FridgeGlass_0: Mesh;
		Fridge_FridgeInside_0: Mesh;
		Hob_Hob_0: Mesh;
		Hob_Material_0: Mesh;
		Lightbulbs_Lights_0: Mesh;
		LightsGlass_LightGlass_0: Mesh;
		LightSupport_Chrome_0: Mesh;
		Ovens_Handles_0: Mesh;
		Ovens_Hob_0: Mesh;
		Ovens_Oven_0: Mesh;
		Ovens_OvenClock_0: Mesh;
		Ovens_OvenWindow_0: Mesh;
		Sink_Sink_0: Mesh;
		SmallPlant_Bark_0: Mesh;
		SmallPlant_Plant_0: Mesh;
		SmallPlant_Pot_0: Mesh;
		Stairs_Stairs_0: Mesh;
		Chair: Mesh;
		Tiles_Tiles_0: Mesh;
		Trim_CupboardTrim_0: Mesh;
		Window_Window_0: Mesh;
		WindowTrim_CupboardTrim_0: Mesh;
		Wall: Mesh;
		Houseplant_7_1: Mesh;
		Houseplant_7_2: Mesh;
		Houseplant_7_3: Mesh;
		ScythianAntique: Mesh;
		Couch_Small1_1: Mesh;
		Couch_Small1_2: Mesh;
		Desk_1: Mesh;
		Desk_2: Mesh;
		Desk_Drawer1_1: Mesh;
		Desk_Drawer1_2: Mesh;
		Desk_Drawer2_1: Mesh;
		Desk_Drawer2_2: Mesh;
		Desk_Drawer3_1: Mesh;
		Desk_Drawer3_2: Mesh;
		Desk_Drawer4_1: Mesh;
		Desk_Drawer4_2: Mesh;
		rugRound_2: Mesh;
		rugRound_2_1: Mesh;
		Houseplant_4_1: Mesh;
		Houseplant_4_2: Mesh;
		Houseplant_4_3: Mesh;
		Couch_Medium1_1: Mesh;
		Couch_Medium1_2: Mesh;
		Plane: Mesh;
		Plane001: Mesh;
		Plane002: Mesh;
		Plane003: Mesh;
		Plane004: Mesh;
		Plane005: Mesh;
		Plane006: Mesh;
		Plane007: Mesh;
		Plane008: Mesh;
		Plane009: Mesh;
		Plane010: Mesh;
		Plane011: Mesh;
	};
	materials: {
		Ceiling: MeshStandardMaterial;
		material_0: MeshStandardMaterial;
		Cupboard2: MeshStandardMaterial;
		Floor1: MeshStandardMaterial;
		FridgeGlass: MeshStandardMaterial;
		FridgeInside: MeshStandardMaterial;
		material: MeshStandardMaterial;
		["Material.001"]: MeshStandardMaterial;
		Lights: MeshStandardMaterial;
		LightGlass: MeshStandardMaterial;
		Chrome: MeshStandardMaterial;
		Handles: MeshStandardMaterial;
		Oven: MeshStandardMaterial;
		OvenClock: MeshStandardMaterial;
		OvenWindow: MeshStandardMaterial;
		Sink: MeshStandardMaterial;
		Bark: MeshStandardMaterial;
		Plant: MeshStandardMaterial;
		material_16: MeshStandardMaterial;
		Stairs: MeshStandardMaterial;
		Chair2: MeshStandardMaterial;
		Tiles: MeshStandardMaterial;
		CupboardTrim: MeshStandardMaterial;
		Window: MeshStandardMaterial;
		Wall0: MeshStandardMaterial;
		Black: MeshStandardMaterial;
		Brown: MeshStandardMaterial;
		Plant_Green: MeshStandardMaterial;
		M_Gold: MeshStandardMaterial;
		["Couch_Blue.001"]: MeshStandardMaterial;
		["Black.003"]: MeshStandardMaterial;
		DarkWood: MeshStandardMaterial;
		Wood: MeshStandardMaterial;
		carpet: MeshStandardMaterial;
		carpetDarker: MeshStandardMaterial;
		["Black.002"]: MeshStandardMaterial;
		["Brown.001"]: MeshStandardMaterial;
		["Plant_Green.001"]: MeshStandardMaterial;
		Couch_Blue: MeshStandardMaterial;
		["Black.001"]: MeshStandardMaterial;
		Floor2: MeshStandardMaterial;
		Wall1: MeshStandardMaterial;
		Wall2: MeshStandardMaterial;
		Floor0: MeshStandardMaterial;
		Chair0: MeshStandardMaterial;
		Chair1: MeshStandardMaterial;
		Cupboard0: MeshStandardMaterial;
		Cupboard1: MeshStandardMaterial;
	};
};

type MaterialKeys = keyof GLTFResult["materials"];

const nbModes = 3;

export default function Experience() {
	const renderTarget1 = useFBO();
	const renderTarget2 = useFBO();
	const renderScene = useRef<Group>(null);
	const renderMaterialRef = useRef<SceneTransitionMaterialT>(null);
	const renderCameraRef = useRef<PerspectiveCameraThree>(null);
	const controlsRef = useRef<CameraControls>(null);

	const { width, height } = useThree((state) => state.viewport);

	const [mode, setMode] = useState(0);
	const prevModeRef = useRef(1);
	const planeRef = useRef<Mesh>(null);

	const { scene: modernKitchenScene, materials } = useGLTF(
		"/assets/SceneTransition/modern_kitchen.glb"
	) as GLTFResult;

	useControls("SCENE", {
		mode: {
			options: [0, 1, 2],
			value: 0,
			onChange: (value) => {
				setMode((prevVal) => {
					if (prevVal !== value) {
						prevModeRef.current = prevVal;

						if (renderMaterialRef.current?.uProgression !== undefined) {
							renderMaterialRef.current.uProgression = 0;
						}
					}

					return value;
				});
			},
		},
	});

	const { speed } = useControls("TRANSITION", {
		speed: {
			min: 0.1,
			max: 10,
			value: 2,
		},
		smootheness: {
			value: 0.2,
			min: 0,
			max: 1,
			step: 0.01,
			onChange: (value) => {
				if (renderMaterialRef.current?.uSmoothness !== undefined) {
					renderMaterialRef.current.uSmoothness = value;
				}
			},
		},
		transition: {
			options: {
				Vetical: Transition.VERTICAL,
				Horizontal: Transition.HORIZONTAL,
				Mix: Transition.MIXED,
				FBM: Transition.FBM,
				Cnoise: Transition.C_NOISE,
				Worley: Transition.WORLEY,
				Curl: Transition.CURL,
				Diagonal: Transition.DIAGONAL,
				"Fade In": Transition.FADEIN,
			},
			onChange: (value) => {
				if (renderMaterialRef.current?.uTransitionMode !== undefined) {
					renderMaterialRef.current.uTransitionMode = value;
				}
			},
		},
		repeat: {
			value: 1,
			max: 100,
			min: 1,
			step: 0.1,
			onChange: (value) => {
				if (renderMaterialRef.current?.uRepeat !== undefined) {
					renderMaterialRef.current.uRepeat = value;
				}
			},
		},
	});

	const { progressionTarget } = useControls("DEBUG", {
		progressionTarget: {
			value: 1,
			min: 0,
			max: 1,
		},
	});

	useEffect(() => {
		modernKitchenScene.traverse((child) => {
			if (child instanceof Mesh) {
				child.castShadow = true;
				child.receiveShadow = true;
			}
		});
	}, [modernKitchenScene]);

	useEffect(() => {
		if (controlsRef.current && renderCameraRef.current) {
			controlsRef.current.camera = renderCameraRef.current;

			controlsRef.current.setLookAt(
				2.0146122041349432,
				2.822796205893349,
				8.587088991637922,
				1.0858141754116573,
				1.9366397611967157,
				1.7546919697281576
			);
		}
	}, []);

	const itemsToChangeMaterial = useRef<Object3D[]>([]);
	const modeGroups = useRef<Object3D[]>([]);

	useEffect(() => {
		const items = ["Wall", "Floor", "Chair", "Cupboard"];

		items.forEach((item) => {
			const obj = modernKitchenScene.getObjectByName(item);

			if (obj) {
				itemsToChangeMaterial.current.push(obj);
			}
		});

		for (let i = 0; i < nbModes; i++) {
			const group = modernKitchenScene.getObjectByName(`Mode${i}`);

			if (group) {
				modeGroups.current.push(group);
			}
		}
	}, [modernKitchenScene]);

	useFrame(({ gl, scene }, delta) => {
		if (renderScene.current && renderCameraRef.current && planeRef.current) {
			planeRef.current.visible = false;
			renderScene.current.visible = true;

			gl.setRenderTarget(renderTarget1);

			itemsToChangeMaterial.current.forEach((item) => {
				if ("material" in item) {
					item.material =
						materials[(item.name + prevModeRef.current) as MaterialKeys];
				}
			});
			modeGroups.current.forEach((group, index) => {
				group.visible = index === prevModeRef.current;
			});

			if (renderMaterialRef.current?.uProgression !== undefined) {
				renderMaterialRef.current.uProgression = MathUtils.lerp(
					renderMaterialRef.current.uProgression,
					progressionTarget,
					delta * speed
				);
			}

			gl.render(scene, renderCameraRef.current);

			gl.setRenderTarget(renderTarget2);

			itemsToChangeMaterial.current.forEach((item) => {
				if ("material" in item) {
					item.material = materials[(item.name + mode) as MaterialKeys];
				}
			});
			modeGroups.current.forEach((group, index) => {
				group.visible = index === mode;
			});

			gl.render(scene, renderCameraRef.current);

			renderScene.current.visible = false;

			gl.setRenderTarget(null);

			planeRef.current.visible = true;
		}
	});

	return (
		<>
			<PerspectiveCamera
				ref={renderCameraRef}
				near={0.5}
			/>

			<CameraControls
				minPolarAngle={DEG2RAD * 70}
				maxPolarAngle={DEG2RAD * 85}
				minAzimuthAngle={DEG2RAD * -30}
				maxAzimuthAngle={DEG2RAD * 30}
				minDistance={5}
				maxDistance={7}
				ref={controlsRef}
			/>

			<mesh ref={planeRef}>
				<planeGeometry args={[width, height]} />
				<sceneTransitionMaterial
					ref={renderMaterialRef}
					uTextureStart={renderTarget1.texture}
					uTextureEnd={renderTarget2.texture}
				/>
			</mesh>

			<group ref={renderScene}>
				<primitive
					object={modernKitchenScene}
					rotation-y={Math.PI / 2}
				/>
			</group>
			<Environment
				preset="sunset"
				blur={0.4}
				background
			/>
		</>
	);
}
