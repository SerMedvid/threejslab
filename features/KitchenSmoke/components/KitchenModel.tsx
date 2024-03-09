/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.11 public/assets/KitchenSmoke/Kitchen.glb -o features/KitchenSmoke/components/KitchenModel.tsx -t 
*/

import * as THREE from "three";
import React from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import VentLight from "./VentLight";
import Mug from "./Mug";
import Toaser from "./Toaser";
import Teapot from "./Teapot";
import Eggs from "./Eggs";

type GLTFResult = GLTF & {
	nodes: {
		Room_1: THREE.Mesh;
		Room_2: THREE.Mesh;
		Oven_1: THREE.Mesh;
		Oven_2: THREE.Mesh;
		Burner001: THREE.Mesh;
		Burner002: THREE.Mesh;
		Burner003: THREE.Mesh;
		Burner: THREE.Mesh;
		GasHandler: THREE.Mesh;
		GasHandler001: THREE.Mesh;
		GasHandler002: THREE.Mesh;
		GasHandler003: THREE.Mesh;
		OvenHandler: THREE.Mesh;
		Table_1: THREE.Mesh;
		Table_2: THREE.Mesh;
		DoorHandler001: THREE.Mesh;
		DoorHandler002: THREE.Mesh;
		Table001_1: THREE.Mesh;
		Table001_2: THREE.Mesh;
		DoorHandler003: THREE.Mesh;
		Table002_1: THREE.Mesh;
		Table002_2: THREE.Mesh;
		Table002_3: THREE.Mesh;
		DoorHandler004: THREE.Mesh;
		DoorHandler005: THREE.Mesh;
		DoorHandler: THREE.Mesh;
		Fridge: THREE.Mesh;
		FridgeDoors_1: THREE.Mesh;
		FridgeDoors_2: THREE.Mesh;
		FridgeDoorsTop: THREE.Mesh;
		FridgeHandler: THREE.Mesh;
		FridgeHandler001: THREE.Mesh;
		Vent_1: THREE.Mesh;
		Vent_2: THREE.Mesh;
		VentLight: THREE.Mesh;
		Shelf: THREE.Mesh;
		Shelf001: THREE.Mesh;
		DinnerTable: THREE.Mesh;
		DinnerTableTop: THREE.Mesh;
		Bottle: THREE.Mesh;
		Lid011: THREE.Mesh;
		Bottle001: THREE.Mesh;
		Lid001: THREE.Mesh;
		Bottle002: THREE.Mesh;
		Lid002: THREE.Mesh;
		Bottle003: THREE.Mesh;
		Lid003: THREE.Mesh;
		Bottle004: THREE.Mesh;
		Lid004: THREE.Mesh;
		Bottle005: THREE.Mesh;
		Lid005: THREE.Mesh;
		Bottle006: THREE.Mesh;
		Lid006: THREE.Mesh;
		Bottle007: THREE.Mesh;
		Lid007: THREE.Mesh;
		Bottle008: THREE.Mesh;
		Lid008: THREE.Mesh;
		Bottle009: THREE.Mesh;
		Lid009: THREE.Mesh;
		Fry_1: THREE.Mesh;
		Fry_2: THREE.Mesh;
		Egg_1: THREE.Mesh;
		Egg_2: THREE.Mesh;
		Pot_1: THREE.Mesh;
		Pot_2: THREE.Mesh;
		Lid002_1: THREE.Mesh;
		Lid002_2: THREE.Mesh;
		Lid002_3: THREE.Mesh;
		Chair_1: THREE.Mesh;
		Chair_2: THREE.Mesh;
		ChairTop001: THREE.Mesh;
		ChairTop: THREE.Mesh;
		Toaster_1: THREE.Mesh;
		Toaster_2: THREE.Mesh;
		Cable: THREE.Mesh;
		Jumper: THREE.Mesh;
		Switch: THREE.Mesh;
		Bread001: THREE.Mesh;
		Bread: THREE.Mesh;
		Mug001: THREE.Mesh;
		Coffee001: THREE.Mesh;
		Mug002: THREE.Mesh;
		Coffee002: THREE.Mesh;
		Socket: THREE.Mesh;
		Plate: THREE.Mesh;
		Plate001: THREE.Mesh;
		Plate002: THREE.Mesh;
		Plate003: THREE.Mesh;
		Plate004: THREE.Mesh;
		Table003_1: THREE.Mesh;
		Table003_2: THREE.Mesh;
		DoorHandler006: THREE.Mesh;
		DoorHandler007: THREE.Mesh;
		TableDoors: THREE.Mesh;
		Teapot: THREE.Mesh;
		Lid_1: THREE.Mesh;
		Lid_2: THREE.Mesh;
		TeapotHandle: THREE.Mesh;
	};
	materials: {
		Walls: THREE.MeshStandardMaterial;
		White: THREE.MeshStandardMaterial;
		LightGreen: THREE.MeshStandardMaterial;
		Black: THREE.MeshStandardMaterial;
		Wood: THREE.MeshStandardMaterial;
		Green: THREE.MeshStandardMaterial;
		Steel: THREE.MeshStandardMaterial;
		Gray: THREE.MeshStandardMaterial;
		Red: THREE.MeshStandardMaterial;
		Blue: THREE.MeshStandardMaterial;
		EggWhite: THREE.MeshStandardMaterial;
		EggYellow: THREE.MeshStandardMaterial;
		Bread: THREE.MeshStandardMaterial;
		Coffee: THREE.MeshStandardMaterial;
	};
};

type ContextType = Record<
	string,
	React.ForwardRefExoticComponent<JSX.IntrinsicElements["mesh"]>
>;

export function KitchenModel(props: JSX.IntrinsicElements["group"]) {
	const { nodes, materials } = useGLTF(
		"/assets/KitchenSmoke/Kitchen.glb"
	) as GLTFResult;
	return (
		<group
			{...props}
			dispose={null}
		>
			<group position={[-3, 0, 0]}>
				<mesh
					geometry={nodes.Oven_1.geometry}
					material={materials.LightGreen}
					receiveShadow
				/>
				<mesh
					geometry={nodes.Oven_2.geometry}
					material={materials.Black}
					receiveShadow
				/>
				<mesh
					geometry={nodes.Burner001.geometry}
					material={materials.Black}
					position={[-0.371, 2, -0.4]}
				/>
				<mesh
					geometry={nodes.Burner002.geometry}
					material={materials.Black}
					position={[0.457, 2, -0.4]}
				/>
				<mesh
					geometry={nodes.Burner003.geometry}
					material={materials.Black}
					position={[0.457, 2, 0.463]}
				/>
				<mesh
					geometry={nodes.Burner.geometry}
					material={materials.Black}
					position={[-0.371, 2, 0.452]}
				/>
				<mesh
					geometry={nodes.GasHandler.geometry}
					material={materials.Black}
					position={[1.031, 1.836, 0.685]}
					rotation={[0, 0, -Math.PI / 2]}
					castShadow
				/>
				<mesh
					geometry={nodes.GasHandler001.geometry}
					material={materials.Black}
					position={[1.031, 1.836, 0.302]}
					rotation={[0, 0, -Math.PI / 2]}
					castShadow
				/>
				<mesh
					geometry={nodes.GasHandler002.geometry}
					material={materials.Black}
					position={[1.031, 1.836, -0.171]}
					rotation={[0, 0, -Math.PI / 2]}
					castShadow
				/>
				<mesh
					geometry={nodes.GasHandler003.geometry}
					material={materials.Black}
					position={[1.031, 1.836, -0.658]}
					rotation={[0, 0, -Math.PI / 2]}
					castShadow
				/>
				<mesh
					geometry={nodes.OvenHandler.geometry}
					material={materials.Black}
					position={[0, 0.065, 0]}
					castShadow
				/>
			</group>
			<group position={[-3.021, 0.008, 2.496]}>
				<mesh
					geometry={nodes.Table_1.geometry}
					material={materials.Wood}
					receiveShadow
				/>
				<mesh
					geometry={nodes.Table_2.geometry}
					material={materials.Green}
					receiveShadow
				/>
				<mesh
					geometry={nodes.DoorHandler001.geometry}
					material={materials.Steel}
					position={[1.058, 0.921, 0.421]}
					castShadow
				/>
				<mesh
					geometry={nodes.DoorHandler002.geometry}
					material={materials.Steel}
					position={[1.058, 0.921, -0.421]}
					castShadow
				/>
			</group>
			<group position={[-3.021, 0.008, -2.495]}>
				<mesh
					geometry={nodes.Table001_1.geometry}
					material={materials.Wood}
					receiveShadow
				/>
				<mesh
					geometry={nodes.Table001_2.geometry}
					material={materials.Green}
					receiveShadow
				/>
				<mesh
					geometry={nodes.DoorHandler003.geometry}
					material={materials.Steel}
					position={[1.058, 0.921, 1.217]}
					castShadow
				/>
			</group>
			<group
				position={[-0.507, 0.008, -3.005]}
				rotation={[0, -1.571, 0]}
			>
				<mesh
					geometry={nodes.Table002_1.geometry}
					material={materials.Wood}
					receiveShadow
				/>
				<mesh
					geometry={nodes.Table002_2.geometry}
					material={materials.Green}
					receiveShadow
				/>
				<mesh
					geometry={nodes.Table002_3.geometry}
					material={materials.Black}
					castShadow
					receiveShadow
				/>
				<mesh
					geometry={nodes.DoorHandler004.geometry}
					material={materials.Steel}
					position={[1.065, 0.921, 1.16]}
					rotation={[0, 1.571, 0]}
					castShadow
				/>
				<mesh
					geometry={nodes.DoorHandler005.geometry}
					material={materials.Steel}
					position={[1.065, 0.602, -0.556]}
					rotation={[0, 1.571, 0]}
					castShadow
				/>
				<mesh
					geometry={nodes.DoorHandler.geometry}
					material={materials.Steel}
					position={[1.065, 0.291, -0.556]}
					rotation={[0, 1.571, 0]}
					castShadow
				/>
			</group>
			<mesh
				geometry={nodes.Fridge.geometry}
				material={materials.Gray}
				position={[1.895, 0, -2.968]}
				castShadow
			>
				<mesh
					geometry={nodes.FridgeDoorsTop.geometry}
					material={materials.LightGreen}
					receiveShadow
				/>
				<mesh
					geometry={nodes.FridgeHandler.geometry}
					material={materials.Steel}
					position={[-0.693, 2.668, 0.715]}
					castShadow
				/>
				<mesh
					geometry={nodes.FridgeHandler001.geometry}
					material={materials.Steel}
					position={[-0.693, 1.617, 0.715]}
					castShadow
				/>
				<mesh
					geometry={nodes.FridgeDoors_1.geometry}
					material={materials.LightGreen}
				/>
				<mesh
					geometry={nodes.FridgeDoors_2.geometry}
					material={materials.Steel}
				/>
			</mesh>
			<group position={[-3.028, 3.465, 0]}>
				<mesh
					geometry={nodes.Vent_1.geometry}
					material={materials.Gray}
					castShadow
				/>
				<mesh
					geometry={nodes.Vent_2.geometry}
					material={materials.Wood}
				/>

				<VentLight
					position={[0.805, 0, 0]}
					nodes={nodes}
					materials={materials}
				/>
			</group>
			<mesh
				geometry={nodes.Shelf.geometry}
				material={materials.Wood}
				position={[-4.001, 3.311, 2.814]}
				castShadow
				receiveShadow
			/>
			<mesh
				geometry={nodes.Shelf001.geometry}
				material={materials.Wood}
				position={[-4.001, 3.935, 2.814]}
				castShadow
				receiveShadow
			/>
			<mesh
				geometry={nodes.DinnerTable.geometry}
				material={materials.Wood}
				position={[1.634, -0.013, 1.812]}
				castShadow
			>
				<mesh
					geometry={nodes.DinnerTableTop.geometry}
					material={materials.Wood}
					receiveShadow
				/>
			</mesh>
			<mesh
				geometry={nodes.Bottle.geometry}
				material={materials.LightGreen}
				position={[-3.684, 3.382, 3.41]}
				castShadow
			>
				<mesh
					geometry={nodes.Lid011.geometry}
					material={materials.Wood}
				/>
			</mesh>
			<mesh
				geometry={nodes.Bottle001.geometry}
				material={materials.Red}
				position={[-3.77, 3.381, 3.086]}
				castShadow
			>
				<mesh
					geometry={nodes.Lid001.geometry}
					material={materials.Wood}
				/>
			</mesh>
			<mesh
				geometry={nodes.Bottle002.geometry}
				material={materials.Blue}
				position={[-3.737, 3.382, 2.391]}
				castShadow
			>
				<mesh
					geometry={nodes.Lid002.geometry}
					material={materials.Wood}
				/>
			</mesh>
			<mesh
				geometry={nodes.Bottle003.geometry}
				material={materials.Gray}
				position={[-3.658, 4.004, 3.41]}
				castShadow
			>
				<mesh
					geometry={nodes.Lid003.geometry}
					material={materials.Wood}
				/>
			</mesh>
			<mesh
				geometry={nodes.Bottle004.geometry}
				material={materials.Gray}
				position={[-3.836, 4.004, 3.338]}
				castShadow
			>
				<mesh
					geometry={nodes.Lid004.geometry}
					material={materials.Wood}
				/>
			</mesh>
			<mesh
				geometry={nodes.Bottle005.geometry}
				material={materials.Gray}
				position={[-3.684, 4.004, 3.22]}
				castShadow
			>
				<mesh
					geometry={nodes.Lid005.geometry}
					material={materials.Wood}
				/>
			</mesh>
			<mesh
				geometry={nodes.Bottle006.geometry}
				material={materials.Gray}
				position={[-3.834, 4.004, 3.137]}
				castShadow
			>
				<mesh
					geometry={nodes.Lid006.geometry}
					material={materials.Wood}
				/>
			</mesh>
			<mesh
				geometry={nodes.Bottle007.geometry}
				material={materials.Gray}
				position={[-3.689, 4.004, 3.002]}
				castShadow
			>
				<mesh
					geometry={nodes.Lid007.geometry}
					material={materials.Wood}
				/>
			</mesh>
			<mesh
				geometry={nodes.Bottle008.geometry}
				material={materials.Gray}
				position={[-3.844, 4.004, 2.872]}
				castShadow
			>
				<mesh
					geometry={nodes.Lid008.geometry}
					material={materials.Wood}
				/>
			</mesh>
			<mesh
				geometry={nodes.Bottle009.geometry}
				material={materials.Gray}
				position={[-3.685, 4.004, 2.731]}
				castShadow
			>
				<mesh
					geometry={nodes.Lid009.geometry}
					material={materials.Wood}
				/>
			</mesh>
			<group
				position={[-2.535, 2.049, -0.402]}
				rotation={[0, 0.631, 0]}
				castShadow
			>
				<mesh
					geometry={nodes.Fry_1.geometry}
					material={materials.Wood}
					castShadow
				/>
				<mesh
					geometry={nodes.Fry_2.geometry}
					material={materials.Steel}
					castShadow
				/>

				<Eggs
					position={[-0.002, 0.016, 0.012]}
					nodes={nodes}
					materials={materials}
				/>
			</group>

			<group position={[-3.362, 2.044, 0.467]}>
				<mesh
					geometry={nodes.Pot_1.geometry}
					material={materials.Blue}
					receiveShadow
					castShadow
				/>
				<mesh
					geometry={nodes.Pot_2.geometry}
					material={materials.Black}
				/>
				<group
					position={[0, 0.313, 0.019]}
					rotation={[-0.083, 0, 0]}
				>
					<mesh
						geometry={nodes.Lid002_1.geometry}
						material={materials.Blue}
					/>
					<mesh
						geometry={nodes.Lid002_2.geometry}
						material={materials.Black}
					/>
					<mesh
						geometry={nodes.Lid002_3.geometry}
						material={materials.Steel}
					/>
				</group>
			</group>
			<group position={[0.34, 0, 2.138]}>
				<mesh
					geometry={nodes.Chair_1.geometry}
					material={materials.Wood}
					castShadow
				/>
				<mesh
					geometry={nodes.Chair_2.geometry}
					material={materials.Green}
					castShadow
				/>
				<mesh
					geometry={nodes.ChairTop001.geometry}
					material={materials.Wood}
					receiveShadow
				/>
			</group>
			<group
				position={[2.827, 0, 1.4]}
				rotation={[Math.PI, 0, Math.PI]}
			>
				<mesh
					geometry={nodes.Chair_1.geometry}
					material={materials.Wood}
					castShadow
				/>
				<mesh
					geometry={nodes.Chair_2.geometry}
					material={materials.Green}
					castShadow
				/>
				<mesh
					geometry={nodes.ChairTop.geometry}
					material={materials.Wood}
					receiveShadow
				/>
			</group>

			<Toaser
				nodes={nodes}
				materials={materials}
				position={[-2.69, 1.95, 2.271]}
			/>

			<Mug
				position={[2.203, 1.661, 1.218]}
				rotation={[0, -1.167, 0]}
				nodes={{
					Mug: nodes.Mug001,
					Coffee: nodes.Coffee001,
				}}
				materials={{ Mug: materials.Blue, Coffee: materials.Coffee }}
			/>

			<Mug
				position={[1.04, 1.661, 2.124]}
				rotation={[0, 0.945, 0]}
				nodes={{
					Mug: nodes.Mug002,
					Coffee: nodes.Coffee002,
				}}
				materials={{ Mug: materials.Red, Coffee: materials.Coffee }}
			/>

			<mesh
				geometry={nodes.Socket.geometry}
				material={nodes.Socket.material}
				position={[-4.001, 2.194, 2.704]}
				rotation={[0, 0, -Math.PI / 2]}
				castShadow
			/>
			<mesh
				geometry={nodes.Plate.geometry}
				material={materials.White}
				position={[-1.264, 1.95, -2.863]}
				castShadow
			/>
			<mesh
				geometry={nodes.Plate001.geometry}
				material={materials.White}
				position={[-1.264, 1.967, -2.863]}
				castShadow
			/>
			<mesh
				geometry={nodes.Plate002.geometry}
				material={materials.White}
				position={[-1.264, 1.985, -2.863]}
				castShadow
			/>
			<mesh
				geometry={nodes.Plate003.geometry}
				material={materials.White}
				position={[-1.264, 2.005, -2.863]}
				castShadow
			/>
			<mesh
				geometry={nodes.Plate004.geometry}
				material={materials.White}
				position={[-1.264, 2.024, -2.863]}
				castShadow
			/>
			<group
				position={[-0.783, 3.578, -3.526]}
				rotation={[0, -Math.PI / 2, 0]}
			>
				<mesh
					geometry={nodes.Table003_1.geometry}
					material={materials.Wood}
				/>
				<mesh
					geometry={nodes.Table003_2.geometry}
					material={materials.Green}
					castShadow
				/>
				<mesh
					geometry={nodes.DoorHandler006.geometry}
					material={materials.Steel}
					position={[0.472, 0.458, 0.347]}
					rotation={[0, Math.PI / 2, 0]}
					castShadow
				/>
				<mesh
					geometry={nodes.DoorHandler007.geometry}
					material={materials.Steel}
					position={[0.472, 0.458, -0.357]}
					rotation={[0, Math.PI / 2, 0]}
					castShadow
				/>
				<mesh
					geometry={nodes.TableDoors.geometry}
					material={materials.Green}
					receiveShadow
				/>
			</group>

			<Teapot
				position={[-2.533, 2.049, 0.468]}
				nodes={nodes}
				materials={materials}
			/>

			<mesh
				geometry={nodes.Room_1.geometry}
				material={materials.Walls}
				receiveShadow
			/>
			<mesh
				geometry={nodes.Room_2.geometry}
				material={materials.White}
				receiveShadow
			/>
		</group>
	);
}

useGLTF.preload("/assets/KitchenSmoke/Kitchen.glb");
