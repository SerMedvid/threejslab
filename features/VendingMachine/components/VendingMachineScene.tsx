/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.11 public/assets/VendingMachine/cyberpank-vendor-machine.glb -o features/VendorMachinePage/components/VendingMachineScene.tsx -t 
*/

import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import DamagedBarrel from "./DamagedBarrel";
import StreetLight from "./StreetLight";
import Chimney from "./Chimney";
import LeftDisplay from "./LeftDisplay";
import TopDisplay from "./TopDisplay";
import CabineLight from "./CabineLight";
import RightDisplay from "./RightDisplay";
import VentRibbon from "./VentRibbons";

type GLTFResult = GLTF & {
	nodes: {
		Wheel004: THREE.Mesh;
		Wheel005: THREE.Mesh;
		Wheel006: THREE.Mesh;
		Wheel007: THREE.Mesh;
		Chassis001: THREE.Mesh;
		Cabels003: THREE.Mesh;
		Cabels004: THREE.Mesh;
		Cabels005: THREE.Mesh;
		Suspensions001: THREE.Mesh;
		Suspensions010: THREE.Mesh;
		Suspensions011: THREE.Mesh;
		Suspensions012: THREE.Mesh;
		Suspensions013: THREE.Mesh;
		Suspensions014: THREE.Mesh;
		Suspensions015: THREE.Mesh;
		Suspensions016: THREE.Mesh;
		Cabine001: THREE.Mesh;
		Chimney001: THREE.Mesh;
		VentsBack001: THREE.Mesh;
		VentsSide001: THREE.Mesh;
		CashDesk001: THREE.Mesh;
		VentBar001: THREE.Mesh;
		Plane003: THREE.Mesh;
		Plane005: THREE.Mesh;
		Plane006: THREE.Mesh;
		DispayTopFrame001: THREE.Mesh;
		DisplayTopCable001: THREE.Mesh;
		DisplayTopPlane001: THREE.Mesh;
		DisplayTopStand001: THREE.Mesh;
		DisplayTopSupport001: THREE.Mesh;
		DisplayRight001: THREE.Mesh;
		DisplayRightCable002: THREE.Mesh;
		DisplayRightCable003: THREE.Mesh;
		DisplayRightPlane001: THREE.Mesh;
		DisplayRightPlug001: THREE.Mesh;
		DisplayLeftFrame001: THREE.Mesh;
		DisplayLeft001: THREE.Mesh;
		GasTank006: THREE.Mesh;
		GasTank007: THREE.Mesh;
		GasTank008: THREE.Mesh;
		GasTank009: THREE.Mesh;
		GasTank010: THREE.Mesh;
		GasTank011: THREE.Mesh;
		GasCabel1001: THREE.Mesh;
		GasCabel2001: THREE.Mesh;
		AC001: THREE.Mesh;
		Lamp001: THREE.Mesh;
		Shelves002: THREE.Mesh;
		Shelves003: THREE.Mesh;
		Terminal001: THREE.Mesh;
		ChiniseFoodContainer001: THREE.Mesh;
		ChiniseFoodContainer012: THREE.Mesh;
		ChiniseFoodContainer013: THREE.Mesh;
		ChiniseFoodContainer014: THREE.Mesh;
		ChiniseFoodContainer015: THREE.Mesh;
		ChiniseFoodContainer016: THREE.Mesh;
		ChiniseFoodContainer017: THREE.Mesh;
		ChiniseFoodContainer018: THREE.Mesh;
		ChiniseFoodContainer019: THREE.Mesh;
		ChiniseFoodContainer020: THREE.Mesh;
		ChiniseFoodContainer021: THREE.Mesh;
		CanRed008: THREE.Mesh;
		CanRed010: THREE.Mesh;
		CanRed011: THREE.Mesh;
		CanRed012: THREE.Mesh;
		CanRed013: THREE.Mesh;
		CanRed014: THREE.Mesh;
		CanRed015: THREE.Mesh;
		CanBlue009: THREE.Mesh;
		CanBlue010: THREE.Mesh;
		CanBlue011: THREE.Mesh;
		CanBlue012: THREE.Mesh;
		CanBlue013: THREE.Mesh;
		CanBlue014: THREE.Mesh;
		CanBlue015: THREE.Mesh;
		CanBlue016: THREE.Mesh;
		CanBlue017: THREE.Mesh;
		CanBlueDamaged004: THREE.Mesh;
		CanBlueDamaged005: THREE.Mesh;
		CanBlueDamaged006: THREE.Mesh;
		CanBlueDamaged007: THREE.Mesh;
		Tenticle001: THREE.Mesh;
		Barrel001: THREE.Mesh;
		BarrelTop002: THREE.Mesh;
		Barrel003: THREE.Mesh;
		BarrelTop003: THREE.Mesh;
		Terain001: THREE.Mesh;
		StreetLight002: THREE.Mesh;
		StreetLight003: THREE.Mesh;
		BarrelDamaged001: THREE.Mesh;
	};
	materials: {
		VM_Baked: THREE.MeshStandardMaterial;
		FoodEnvBaked: THREE.MeshStandardMaterial;
	};
};

type ContextType = Record<
	string,
	React.ForwardRefExoticComponent<JSX.IntrinsicElements["mesh"]>
>;

export function VendingMachineScene(props: JSX.IntrinsicElements["group"]) {
	const { nodes, materials } = useGLTF(
		"/assets/VendingMachine/cyberpank-vendor-machine.glb"
	) as GLTFResult;
	return (
		<group
			{...props}
			dispose={null}
		>
			<mesh
				geometry={nodes.Wheel004.geometry}
				material={materials.VM_Baked}
				position={[4.584, 1.034, -2.291]}
				rotation={[0, -0.205, -Math.PI / 2]}
			/>
			<mesh
				geometry={nodes.Wheel005.geometry}
				material={materials.VM_Baked}
				position={[5.084, 1.034, -4.691]}
				rotation={[0, -0.205, -Math.PI / 2]}
			/>
			<mesh
				geometry={nodes.Wheel006.geometry}
				material={materials.VM_Baked}
				position={[0.151, 1.034, -5.719]}
				rotation={[-Math.PI, 0.205, Math.PI / 2]}
			/>
			<mesh
				geometry={nodes.Wheel007.geometry}
				material={materials.VM_Baked}
				position={[-0.349, 1.034, -3.318]}
				rotation={[-Math.PI, 0.205, Math.PI / 2]}
			/>
			<mesh
				geometry={nodes.Chassis001.geometry}
				material={materials.VM_Baked}
				position={[2.367, 0, -4.005]}
				rotation={[0, -0.205, -Math.PI / 2]}
			>
				<mesh
					geometry={nodes.Cabels003.geometry}
					material={materials.VM_Baked}
					rotation={[0, 0, Math.PI / 2]}
				/>
				<mesh
					geometry={nodes.Cabels004.geometry}
					material={materials.VM_Baked}
					rotation={[0, 0, Math.PI / 2]}
				/>
				<mesh
					geometry={nodes.Cabels005.geometry}
					material={materials.VM_Baked}
					position={[0, -0.083, 0]}
					rotation={[0, 0, Math.PI / 2]}
				/>
				<mesh
					geometry={nodes.Suspensions001.geometry}
					material={materials.VM_Baked}
					position={[-1.551, -0.736, -1.209]}
					rotation={[Math.PI, 0, 1.085]}
				/>
				<mesh
					geometry={nodes.Suspensions010.geometry}
					material={materials.VM_Baked}
					position={[-1.551, 0.736, 1.209]}
					rotation={[0, 0, 1.085]}
				/>
				<mesh
					geometry={nodes.Suspensions011.geometry}
					material={materials.VM_Baked}
					position={[-1.553, 0.732, 1.001]}
					rotation={[0, 0, 1.085]}
				/>
				<mesh
					geometry={nodes.Suspensions012.geometry}
					material={materials.VM_Baked}
					position={[-1.553, 0.732, -1.001]}
					rotation={[0, 0, 1.085]}
				/>
				<mesh
					geometry={nodes.Suspensions013.geometry}
					material={materials.VM_Baked}
					position={[-1.551, 0.736, -1.209]}
					rotation={[0, 0, 1.085]}
				/>
				<mesh
					geometry={nodes.Suspensions014.geometry}
					material={materials.VM_Baked}
					position={[-1.551, -0.736, 1.209]}
					rotation={[Math.PI, 0, 1.085]}
				/>
				<mesh
					geometry={nodes.Suspensions015.geometry}
					material={materials.VM_Baked}
					position={[-1.553, -0.732, 1.001]}
					rotation={[Math.PI, 0, 1.085]}
				/>
				<mesh
					geometry={nodes.Suspensions016.geometry}
					material={materials.VM_Baked}
					position={[-1.553, -0.732, -1.001]}
					rotation={[Math.PI, 0, 1.085]}
				/>
			</mesh>
			<mesh
				geometry={nodes.Cabine001.geometry}
				material={materials.VM_Baked}
				position={[2.163, 1.469, -3.027]}
				rotation={[0, -0.205, 0]}
				castShadow
			>
				<Chimney
					nodes={nodes}
					materials={materials}
					position={[1.57, 6.988, -1.127]}
				/>

				<CabineLight />

				<mesh
					geometry={nodes.VentsBack001.geometry}
					material={materials.VM_Baked}
					position={[-1.338, 4.673, -1.695]}
					rotation={[Math.PI / 2, 0, Math.PI]}
				/>
				<mesh
					geometry={nodes.VentsSide001.geometry}
					material={materials.VM_Baked}
					position={[3.193, 3.977, -1.29]}
					rotation={[Math.PI / 2, 0.148, -Math.PI / 2]}
				/>
			</mesh>
			<mesh
				geometry={nodes.CashDesk001.geometry}
				material={materials.VM_Baked}
				position={[1.922, 1.968, -1.96]}
				rotation={[0, -0.205, 0]}
			/>
			<mesh
				geometry={nodes.VentBar001.geometry}
				material={materials.VM_Baked}
				position={[5.086, 7.011, -3.473]}
				rotation={[0, -0.205, -Math.PI / 2]}
			/>
			<VentRibbon
				nodes={nodes}
				materials={materials}
				position={[5.415, 7.14, -3.405]}
				rotation={[Math.PI / 2, 0, 0.205]}
			/>

			<VentRibbon
				nodes={nodes}
				seed={0.6}
				materials={materials}
				position={[5.389, 7.011, -3.279]}
				rotation={[Math.PI / 2, 0, 0.205]}
			/>

			<VentRibbon
				nodes={nodes}
				seed={0.5}
				materials={materials}
				position={[5.465, 7.011, -3.525]}
				rotation={[Math.PI / 2, 0, 0.205]}
			/>

			<mesh
				geometry={nodes.DispayTopFrame001.geometry}
				material={materials.VM_Baked}
				position={[1.736, 7.308, -1.511]}
				rotation={[0, -0.205, 0]}
			>
				<mesh
					geometry={nodes.DisplayTopCable001.geometry}
					material={materials.VM_Baked}
					position={[0.198, 1.078, -0.306]}
				/>

				<TopDisplay nodes={nodes} />

				<mesh
					geometry={nodes.DisplayTopStand001.geometry}
					material={materials.VM_Baked}
					rotation={[Math.PI, 0, Math.PI]}
				/>
				<mesh
					geometry={nodes.DisplayTopSupport001.geometry}
					material={materials.VM_Baked}
					position={[0.743, 1.271, -0.224]}
				/>
			</mesh>
			<mesh
				geometry={nodes.DisplayRight001.geometry}
				material={materials.VM_Baked}
				position={[5.073, 6.036, -2.015]}
				rotation={[0, -0.205, 0]}
			>
				<mesh
					geometry={nodes.DisplayRightCable002.geometry}
					material={materials.VM_Baked}
					position={[0.634, -1.058, -0.067]}
				/>
				<mesh
					geometry={nodes.DisplayRightCable003.geometry}
					material={materials.VM_Baked}
					position={[0.572, -1.038, -0.068]}
				/>

				<RightDisplay nodes={nodes} />

				<mesh
					geometry={nodes.DisplayRightPlug001.geometry}
					material={materials.VM_Baked}
					position={[0.325, -2.123, -1.427]}
					rotation={[0, 0, -Math.PI / 2]}
				/>
			</mesh>
			<mesh
				geometry={nodes.DisplayLeftFrame001.geometry}
				material={materials.VM_Baked}
				position={[-0.881, 6.381, -2.396]}
				rotation={[0, -0.205, 0]}
			>
				<LeftDisplay nodes={nodes} />
			</mesh>
			<mesh
				geometry={nodes.GasTank006.geometry}
				material={materials.VM_Baked}
				position={[4.571, 2.938, -5.32]}
				rotation={[Math.PI, -1.365, Math.PI]}
			/>
			<mesh
				geometry={nodes.GasTank007.geometry}
				material={materials.VM_Baked}
				position={[4.442, 2.933, -4.702]}
				rotation={[Math.PI, -1.365, Math.PI]}
			/>
			<mesh
				geometry={nodes.GasTank008.geometry}
				material={materials.VM_Baked}
				position={[3.762, 2.933, -4.843]}
				rotation={[Math.PI, -1.365, Math.PI]}
			/>
			<mesh
				geometry={nodes.GasTank009.geometry}
				material={materials.VM_Baked}
				position={[3.891, 2.933, -5.462]}
				rotation={[Math.PI, -0.625, Math.PI]}
			/>
			<mesh
				geometry={nodes.GasTank010.geometry}
				material={materials.VM_Baked}
				position={[3.082, 2.933, -4.985]}
				rotation={[Math.PI, -1.365, Math.PI]}
			/>
			<mesh
				geometry={nodes.GasTank011.geometry}
				material={materials.VM_Baked}
				position={[3.211, 2.933, -5.603]}
				rotation={[0, -1.214, 0]}
			/>
			<mesh
				geometry={nodes.GasCabel1001.geometry}
				material={materials.VM_Baked}
				position={[4.426, 5.368, -5.353]}
				rotation={[0, -0.205, 0]}
			/>
			<mesh
				geometry={nodes.GasCabel2001.geometry}
				material={materials.VM_Baked}
				position={[4.296, 5.366, -4.733]}
				rotation={[0, -0.205, 0]}
			/>
			<mesh
				geometry={nodes.AC001.geometry}
				material={materials.VM_Baked}
				position={[1.835, 7.831, -2.903]}
				rotation={[0.488, 0.286, -0.149]}
			/>
			<mesh
				geometry={nodes.Lamp001.geometry}
				material={materials.VM_Baked}
				position={[1.622, 6.95, -0.92]}
				rotation={[0, -0.205, 0]}
			/>
			<mesh
				geometry={nodes.Shelves002.geometry}
				material={materials.VM_Baked}
				position={[2.079, 4.12, -2.661]}
				rotation={[0, -0.205, 0]}
			/>
			<mesh
				geometry={nodes.Shelves003.geometry}
				material={materials.VM_Baked}
				position={[2.079, 5.565, -2.661]}
				rotation={[0, -0.205, 0]}
			/>
			<mesh
				geometry={nodes.Terminal001.geometry}
				material={materials.VM_Baked}
				position={[1.922, 1.968, -1.96]}
				rotation={[0, -0.205, 0]}
			/>
			<mesh
				geometry={nodes.ChiniseFoodContainer001.geometry}
				material={materials.FoodEnvBaked}
				position={[0.524, 4.238, -3.607]}
				rotation={[Math.PI, -1.532, Math.PI]}
			/>
			<mesh
				geometry={nodes.ChiniseFoodContainer012.geometry}
				material={materials.FoodEnvBaked}
				position={[1.129, 4.238, -3.221]}
				rotation={[Math.PI, -1.12, Math.PI]}
			/>
			<mesh
				geometry={nodes.ChiniseFoodContainer013.geometry}
				material={materials.FoodEnvBaked}
				position={[1.771, 4.238, -3.099]}
				rotation={[Math.PI, -1.386, Math.PI]}
			/>
			<mesh
				geometry={nodes.ChiniseFoodContainer014.geometry}
				material={materials.FoodEnvBaked}
				position={[0.481, 4.238, -2.793]}
				rotation={[Math.PI, -1.12, Math.PI]}
			/>
			<mesh
				geometry={nodes.ChiniseFoodContainer015.geometry}
				material={materials.FoodEnvBaked}
				position={[2.458, 4.238, -3.148]}
				rotation={[Math.PI, -1.386, Math.PI]}
			/>
			<mesh
				geometry={nodes.ChiniseFoodContainer016.geometry}
				material={materials.FoodEnvBaked}
				position={[2.887, 4.238, -2.308]}
				rotation={[Math.PI, -0.97, Math.PI]}
			/>
			<mesh
				geometry={nodes.ChiniseFoodContainer017.geometry}
				material={materials.FoodEnvBaked}
				position={[3.813, 4.238, -2.654]}
				rotation={[0, -1.031, 0]}
			/>
			<mesh
				geometry={nodes.ChiniseFoodContainer018.geometry}
				material={materials.FoodEnvBaked}
				position={[1.771, 5.676, -3.099]}
				rotation={[Math.PI, -1.386, Math.PI]}
			/>
			<mesh
				geometry={nodes.ChiniseFoodContainer019.geometry}
				material={materials.FoodEnvBaked}
				position={[1.143, 5.676, -3.073]}
				rotation={[Math.PI, -1.547, Math.PI]}
			/>
			<mesh
				geometry={nodes.ChiniseFoodContainer020.geometry}
				material={materials.FoodEnvBaked}
				position={[2.341, 5.676, -2.774]}
				rotation={[Math.PI, -0.831, Math.PI]}
			/>
			<mesh
				geometry={nodes.ChiniseFoodContainer021.geometry}
				material={materials.FoodEnvBaked}
				position={[3.06, 5.692, -2.272]}
				rotation={[Math.PI, -0.97, Math.PI]}
			/>
			<mesh
				geometry={nodes.CanRed008.geometry}
				material={materials.FoodEnvBaked}
				position={[0.572, 2.938, -3.333]}
				rotation={[Math.PI, -1.111, Math.PI]}
			/>
			<mesh
				geometry={nodes.CanRed010.geometry}
				material={materials.FoodEnvBaked}
				position={[0.807, 2.938, -2.848]}
				rotation={[Math.PI, -1.111, Math.PI]}
			/>
			<mesh
				geometry={nodes.CanRed011.geometry}
				material={materials.FoodEnvBaked}
				position={[0.918, 2.938, -3.443]}
				rotation={[Math.PI, -1.111, Math.PI]}
			/>
			<mesh
				geometry={nodes.CanRed012.geometry}
				material={materials.FoodEnvBaked}
				position={[1.157, 2.938, -3.158]}
				rotation={[Math.PI, -1.111, Math.PI]}
			/>
			<mesh
				geometry={nodes.CanRed013.geometry}
				material={materials.FoodEnvBaked}
				position={[1.726, 2.938, -3.199]}
				rotation={[Math.PI, -1.111, Math.PI]}
			/>
			<mesh
				geometry={nodes.CanRed014.geometry}
				material={materials.FoodEnvBaked}
				position={[3.693, 2.938, -2.558]}
				rotation={[Math.PI, -1.111, Math.PI]}
			/>
			<mesh
				geometry={nodes.CanRed015.geometry}
				material={materials.FoodEnvBaked}
				position={[4.024, 2.938, -1.971]}
				rotation={[Math.PI, -1.111, Math.PI]}
			/>
			<mesh
				geometry={nodes.CanBlue009.geometry}
				material={materials.FoodEnvBaked}
				position={[0.312, 2.936, -3.558]}
				rotation={[Math.PI, -1.536, Math.PI]}
			/>
			<mesh
				geometry={nodes.CanBlue010.geometry}
				material={materials.FoodEnvBaked}
				position={[0.164, 2.936, -3.148]}
				rotation={[Math.PI, -1.536, Math.PI]}
			/>
			<mesh
				geometry={nodes.CanBlue011.geometry}
				material={materials.FoodEnvBaked}
				position={[0.436, 2.936, -2.886]}
				rotation={[Math.PI, -1.536, Math.PI]}
			/>
			<mesh
				geometry={nodes.CanBlue012.geometry}
				material={materials.FoodEnvBaked}
				position={[0.178, 2.936, -2.604]}
				rotation={[Math.PI, -1.536, Math.PI]}
			/>
			<mesh
				geometry={nodes.CanBlue013.geometry}
				material={materials.FoodEnvBaked}
				position={[1.45, 2.936, -3.415]}
				rotation={[Math.PI, -1.536, Math.PI]}
			/>
			<mesh
				geometry={nodes.CanBlue014.geometry}
				material={materials.FoodEnvBaked}
				position={[1.387, 2.936, -2.755]}
				rotation={[Math.PI, -1.536, Math.PI]}
			/>
			<mesh
				geometry={nodes.CanBlue015.geometry}
				material={materials.FoodEnvBaked}
				position={[2.124, 2.936, -3.446]}
				rotation={[Math.PI, -1.536, Math.PI]}
			/>
			<mesh
				geometry={nodes.CanBlue016.geometry}
				material={materials.FoodEnvBaked}
				position={[4.185, 2.936, -2.868]}
				rotation={[Math.PI, -1.536, Math.PI]}
			/>
			<mesh
				geometry={nodes.CanBlue017.geometry}
				material={materials.FoodEnvBaked}
				position={[3.993, 2.936, -2.43]}
				rotation={[Math.PI, -1.536, Math.PI]}
			/>
			<mesh
				geometry={nodes.CanBlueDamaged004.geometry}
				material={materials.FoodEnvBaked}
				position={[1.873, 0.131, 4.131]}
				rotation={[-Math.PI / 2, -1.536, 3.142]}
			/>
			<mesh
				geometry={nodes.CanBlueDamaged005.geometry}
				material={materials.FoodEnvBaked}
				position={[2.888, 0.131, 3.773]}
				rotation={[-0.036, 0.241, -1.562]}
			/>
			<mesh
				geometry={nodes.CanBlueDamaged006.geometry}
				material={materials.FoodEnvBaked}
				position={[2.827, 0.131, 1.338]}
				rotation={[-0.035, -0.069, -1.573]}
			/>
			<mesh
				geometry={nodes.CanBlueDamaged007.geometry}
				material={materials.FoodEnvBaked}
				position={[5.697, 0.131, 3.355]}
				rotation={[-3.097, 0.683, 1.542]}
			/>
			<mesh
				geometry={nodes.Tenticle001.geometry}
				material={materials.FoodEnvBaked}
				position={[0.618, 5.683, -3.352]}
			/>
			<mesh
				geometry={nodes.Barrel001.geometry}
				material={materials.FoodEnvBaked}
				position={[-3.23, 0, 4.187]}
				rotation={[0, 0.319, 0]}
				castShadow
			>
				<mesh
					geometry={nodes.BarrelTop002.geometry}
					material={materials.FoodEnvBaked}
					position={[-0.023, 3.201, -0.013]}
				/>
			</mesh>
			<mesh
				geometry={nodes.Barrel003.geometry}
				material={materials.FoodEnvBaked}
				position={[4.667, 0, 4.983]}
				rotation={[0, 0.878, 0]}
			>
				<mesh
					geometry={nodes.BarrelTop003.geometry}
					material={materials.FoodEnvBaked}
					position={[-0.023, 3.201, -0.013]}
					rotation={[0, 0.558, 0]}
				/>
			</mesh>
			<mesh
				geometry={nodes.Terain001.geometry}
				material={materials.FoodEnvBaked}
				receiveShadow
			/>
			<StreetLight
				nodes={nodes}
				materials={materials}
				position={[-5.043, 0.002, -6.753]}
				withLight
			/>
			<StreetLight
				nodes={nodes}
				materials={materials}
				position={[-11.328, 0.002, 3.46]}
			/>
			<DamagedBarrel
				nodes={nodes}
				materials={materials}
				position={[-8.26, 0, 8.474]}
				rotation={[0, 0.878, 0]}
			/>
			{/* <mesh
				geometry={nodes.BarrelDamaged001.geometry}
				material={materials.FoodEnvBaked}
				position={[-8.26, 0, 8.474]}
				rotation={[0, 0.878, 0]}
			/> */}
		</group>
	);
}

useGLTF.preload("/assets/VendingMachine/cyberpank-vendor-machine.glb");
