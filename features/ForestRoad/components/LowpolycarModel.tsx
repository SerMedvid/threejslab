/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.11 ../../../public/assets/ForestRoad/lowpolycar.glb -t 
*/

import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";

type GLTFResult = GLTF & {
	nodes: {
		Body_1: THREE.Mesh;
		Body_2: THREE.Mesh;
		Body_3: THREE.Mesh;
		Wheel_1: THREE.Mesh;
		Wheel_2: THREE.Mesh;
		Wheel_3: THREE.Mesh;
		Glass: THREE.Mesh;
		FrontLight: THREE.Mesh;
		TurnLightFront: THREE.Mesh;
		Radiator: THREE.Mesh;
		RareLight: THREE.Mesh;
		TurnLightBack: THREE.Mesh;
		Bumper001: THREE.Mesh;
		Bumper: THREE.Mesh;
		Wheel001_1: THREE.Mesh;
		Wheel001_2: THREE.Mesh;
		Wheel001_3: THREE.Mesh;
		Wheel002_1: THREE.Mesh;
		Wheel002_2: THREE.Mesh;
		Wheel002_3: THREE.Mesh;
		Wheel003_1: THREE.Mesh;
		Wheel003_2: THREE.Mesh;
		Wheel003_3: THREE.Mesh;
	};
	materials: {
		Body: THREE.MeshStandardMaterial;
		Resin: THREE.MeshStandardMaterial;
		Glass: THREE.MeshStandardMaterial;
		Tyre: THREE.MeshStandardMaterial;
		Chrome: THREE.MeshStandardMaterial;
		Material: THREE.MeshStandardMaterial;
		Light: THREE.MeshStandardMaterial;
		TurnLight: THREE.MeshStandardMaterial;
		["Rare Light"]: THREE.MeshStandardMaterial;
	};
};

type ContextType = Record<
	string,
	React.ForwardRefExoticComponent<JSX.IntrinsicElements["mesh"]>
>;

export default function LowpolycarModel(props: JSX.IntrinsicElements["group"]) {
	const { nodes, materials } = useGLTF(
		"/assets/ForestRoad/lowpolycar.glb"
	) as GLTFResult;

	const ref = useRef<THREE.Group>(null);
	const timelineRef = useRef<gsap.core.Timeline>();
	const bodyMaterialRef = useRef<THREE.MeshStandardMaterial>(null);

	useFrame(() => {
		if (ref.current) {
			const opacity = Math.min(
				Math.max(4 - Math.abs(ref.current?.position.z || 0), 0),
				1
			);

			ref.current.traverse((child) => {
				if (child instanceof THREE.Mesh) {
					child.material.opacity = opacity;
				}
			});
		}
	});

	useEffect(() => {
		materials.Light.color.multiplyScalar(10);
		materials["Rare Light"].color.multiplyScalar(5);
	}, [materials, materials.Light.color]);

	useEffect(() => {
		if (ref.current) {
			ref.current.traverse((child) => {
				if (child instanceof THREE.Mesh) {
					child.material.transparent = true;
				}
			});

			timelineRef.current = gsap
				.timeline()
				.set(ref.current.position, {
					z: -5,
					x: 0.95,
				})
				.add(() => {
					if (bodyMaterialRef.current) {
						bodyMaterialRef.current.color = new THREE.Color("red");
					}
				})
				.to(ref.current.position, { z: 5, duration: 4, delay: 3 })
				.set(ref.current.rotation, {
					y: -Math.PI / 2,
				})
				.add(() => {
					if (bodyMaterialRef.current) {
						bodyMaterialRef.current.color = new THREE.Color("orange");
					}
				})
				.set(ref.current.position, {
					x: 1.1,
				})
				.to(ref.current.position, {
					z: -5,
					duration: 3,
					delay: 3,
				})
				.add(() => {
					if (bodyMaterialRef.current) {
						bodyMaterialRef.current.color = new THREE.Color("green");
					}
				})
				.set(ref.current.position, {
					x: 0.9,
				})
				.set(ref.current.rotation, {
					y: Math.PI / 2,
				})
				.to(ref.current.position, {
					z: 5,
					duration: 4,
					delay: 2,
				})
				.repeat(-1);
		}
	}, []);

	return (
		<group
			{...props}
			ref={ref}
			dispose={null}
		>
			<group
				position={[-2.097, 0.143, 1.366]}
				rotation={[Math.PI / 2, 0, Math.PI]}
			>
				<mesh
					geometry={nodes.Wheel_1.geometry}
					material={materials.Tyre}
				/>
				<mesh
					geometry={nodes.Wheel_2.geometry}
					material={materials.Chrome}
				/>
				<mesh
					geometry={nodes.Wheel_3.geometry}
					material={materials.Material}
				/>
			</group>
			<mesh
				geometry={nodes.Glass.geometry}
				material={materials.Glass}
			/>
			<mesh
				geometry={nodes.FrontLight.geometry}
				material={materials.Light}
			/>
			<mesh
				geometry={nodes.TurnLightFront.geometry}
				material={materials.TurnLight}
			/>
			<mesh
				geometry={nodes.Radiator.geometry}
				material={materials.Chrome}
			/>
			<mesh
				geometry={nodes.RareLight.geometry}
				material={materials["Rare Light"]}
			/>
			<mesh
				geometry={nodes.TurnLightBack.geometry}
				material={materials.TurnLight}
			/>
			<mesh
				geometry={nodes.Bumper001.geometry}
				material={materials.Resin}
			/>
			<mesh
				geometry={nodes.Bumper.geometry}
				material={materials.Resin}
			/>
			<group
				position={[2.085, 0.143, 1.366]}
				rotation={[Math.PI / 2, 0, Math.PI]}
			>
				<mesh
					geometry={nodes.Wheel001_1.geometry}
					material={materials.Tyre}
				/>
				<mesh
					geometry={nodes.Wheel001_2.geometry}
					material={materials.Chrome}
				/>
				<mesh
					geometry={nodes.Wheel001_3.geometry}
					material={materials.Material}
				/>
			</group>
			<group
				position={[-2.097, 0.143, -1.344]}
				rotation={[Math.PI / 2, 0, 0]}
			>
				<mesh
					geometry={nodes.Wheel002_1.geometry}
					material={materials.Tyre}
				/>
				<mesh
					geometry={nodes.Wheel002_2.geometry}
					material={materials.Chrome}
				/>
				<mesh
					geometry={nodes.Wheel002_3.geometry}
					material={materials.Material}
				/>
			</group>
			<group
				position={[2.085, 0.143, -1.344]}
				rotation={[Math.PI / 2, 0, 0]}
			>
				<mesh
					geometry={nodes.Wheel003_1.geometry}
					material={materials.Tyre}
				/>
				<mesh
					geometry={nodes.Wheel003_2.geometry}
					material={materials.Chrome}
				/>
				<mesh
					geometry={nodes.Wheel003_3.geometry}
					material={materials.Material}
				/>
			</group>
			<mesh geometry={nodes.Body_1.geometry}>
				<meshStandardMaterial
					ref={bodyMaterialRef}
					{...materials.Body}
				/>
			</mesh>
			<mesh
				geometry={nodes.Body_2.geometry}
				material={materials.Resin}
			/>
			<mesh
				geometry={nodes.Body_3.geometry}
				material={materials.Glass}
			/>
		</group>
	);
}

useGLTF.preload("/assets/ForestRoad/lowpolycar.glb");
