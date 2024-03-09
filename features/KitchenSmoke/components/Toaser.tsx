import React, { ElementRef, useEffect, useRef } from "react";
import { Mesh, MeshStandardMaterial } from "three";
import gsap from "gsap";
import Smoke from "./Smoke";

type Props = JSX.IntrinsicElements["group"] & {
	nodes: {
		Toaster_1: Mesh;
		Toaster_2: Mesh;
		Bread: Mesh;
		Cable: Mesh;
		Jumper: Mesh;
		Switch: Mesh;
	};
	materials: {
		Black: MeshStandardMaterial;
		Steel: MeshStandardMaterial;
		Gray: MeshStandardMaterial;
		Bread: MeshStandardMaterial;
	};
};

export default function Toaser({ nodes, materials, ...rest }: Props) {
	const breadRef1 = useRef<Mesh>(null);
	const breadRef2 = useRef<Mesh>(null);
	const smokeRef1 = useRef<ElementRef<typeof Smoke>>(null);
	const smokeRef2 = useRef<ElementRef<typeof Smoke>>(null);
	const jumperRef = useRef<Mesh>(null);
	const timelineRef = useRef<gsap.core.Timeline>();

	useEffect(() => {
		if (
			breadRef1.current &&
			breadRef2.current &&
			jumperRef.current &&
			smokeRef1.current &&
			smokeRef2.current
		) {
			timelineRef.current = gsap
				.timeline()
				.set(smokeRef1.current.material, {
					density: 0.35,
				})
				.set(smokeRef2.current.material, {
					density: 0.35,
				})
				.to(smokeRef1.current.material, {
					density: 0.6,
					duration: 2,
				})
				.to(
					smokeRef2.current.material,
					{
						density: 0.6,
						duration: 2,
					},
					"-=2"
				)
				.to(breadRef1.current.position, {
					y: 0.4,
					duration: 1,
					ease: "back.inOut(6)",
				})
				.to(
					breadRef2.current.position,
					{
						y: 0.4,
						duration: 1,
						ease: "back.inOut(6)",
					},
					"-=1"
				)
				.to(
					jumperRef.current.position,
					{
						y: 0.3,
						duration: 0.1,
					},
					"-=0.6"
				)
				.to(smokeRef1.current.material, {
					density: 0.35,
					duration: 6,
				})
				.to(
					smokeRef2.current.material,
					{
						density: 0.35,
						duration: 6,
					},
					"-=6"
				)
				.to(breadRef1.current.position, {
					y: 0.18,
					duration: 2,
					ease: "power4.out",
				})
				.to(
					breadRef2.current.position,
					{
						y: 0.18,
						duration: 2,
						ease: "power4.out",
					},
					"-=2"
				)
				.to(
					jumperRef.current.position,
					{
						y: 0.214,
						duration: 2,
					},
					"-=2"
				)
				.repeat(-1);

			return () => {
				timelineRef.current?.kill;
			};
		}
	}, []);

	return (
		<group {...rest}>
			<group>
				<mesh
					geometry={nodes.Toaster_1.geometry}
					material={materials.Black}
					castShadow
					receiveShadow
				/>
				<mesh
					geometry={nodes.Toaster_2.geometry}
					material={materials.Steel}
					receiveShadow
				/>
				<mesh
					geometry={nodes.Cable.geometry}
					material={materials.Black}
					position={[-0.281, 0.058, 0.006]}
					castShadow
				/>
				<mesh
					geometry={nodes.Jumper.geometry}
					material={materials.Gray}
					position={[0.256, 0.214, 0]}
					ref={jumperRef}
				/>
				<mesh
					geometry={nodes.Switch.geometry}
					material={materials.Gray}
					position={[0.281, 0.075, 0]}
					rotation={[0, 0, -Math.PI / 2]}
				/>
			</group>
			<mesh
				ref={breadRef1}
				geometry={nodes.Bread.geometry}
				material={materials.Bread}
				position={[0.001, 0.18, -0.059]}
				castShadow
			>
				<Smoke
					ref={smokeRef1}
					scale={[0.2, 0.3, 0.05]}
					seed={0.75}
					speed={0.1}
					rotationSpeed={0.15}
				/>
			</mesh>
			<mesh
				ref={breadRef2}
				geometry={nodes.Bread.geometry}
				material={materials.Bread}
				position={[0.001, 0.18, 0.058]}
				castShadow
			>
				<Smoke
					ref={smokeRef2}
					scale={[0.2, 0.3, 0.05]}
					seed={0.25}
					speed={0.1}
					rotationSpeed={0.15}
				/>
			</mesh>
		</group>
	);
}
