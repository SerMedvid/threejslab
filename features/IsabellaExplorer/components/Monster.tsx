import React, { useEffect, useRef } from "react";
import {
	AnimationAction,
	Color,
	LoopOnce,
	Mesh,
	MeshStandardMaterial,
} from "three";
import { ActionName } from "./Model";

import gsap from "gsap";

type Props = {
	nodes: {
		Monster: Mesh;
		MonsterEyes_1: Mesh;
		MonsterEyes_2: Mesh;
		Sphere001: Mesh;
		Sphere002: Mesh;
	};
	materials: {
		Pupil: MeshStandardMaterial;
		Material: MeshStandardMaterial;
		Body: MeshStandardMaterial;
	};
	actions: Record<ActionName, AnimationAction | null>;
};

const EyeColor = new Color("#E7D400").multiplyScalar(2.5);

export default function Monster({ nodes, materials, actions }: Props) {
	const bodyRef = useRef<Mesh>(null);
	const tl = useRef<gsap.core.Timeline>();

	useEffect(() => {
		tl.current = gsap.timeline({ paused: true }).to(bodyRef.current!.position, {
			z: -5.8,
			x: -3.573,
			duration: 2,
			onComplete: () => {
				const eyesAnimation = actions.Animation;

				if (eyesAnimation) {
					eyesAnimation.setLoop(LoopOnce, 1);
					eyesAnimation.clampWhenFinished = true;
					eyesAnimation.play();
				}
			},
		});

		setTimeout(() => tl.current?.play(), 3000);
	}, [actions]);

	return (
		<mesh
			ref={bodyRef}
			name="Monster"
			geometry={nodes.Monster.geometry}
			material={nodes.Monster.material}
			position={[-6, 2.348, -10]}
			rotation={[0, 0.708, 0]}
		>
			<group
				name="MonsterEyes"
				position={[-0.161, 0.589, 0.533]}
				rotation={[Math.PI / 2, 0, 0.268]}
				scale={0.153}
			>
				<mesh
					name="MonsterEyes_1"
					geometry={nodes.MonsterEyes_1.geometry}
					material={materials.Pupil}
				/>
				<mesh
					name="MonsterEyes_2"
					geometry={nodes.MonsterEyes_2.geometry}
				>
					<meshBasicMaterial
						toneMapped={false}
						color={EyeColor}
					/>
				</mesh>
				<mesh
					name="Sphere001"
					geometry={nodes.Sphere001.geometry}
					material={materials.Body}
					position={[2.748, -0.023, 0]}
				/>
				<mesh
					name="Sphere002"
					geometry={nodes.Sphere002.geometry}
					material={materials.Body}
					position={[2.748, -0.023, 0]}
				/>
			</group>
		</mesh>
	);
}
