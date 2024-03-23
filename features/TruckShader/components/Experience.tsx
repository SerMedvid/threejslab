import {
	ContactShadows,
	OrbitControls,
	Environment,
	Lightformer,
} from "@react-three/drei";
import { CybertruckModel } from "./CybertruckModel";
import { useEffect, useRef } from "react";
import { Color, DoubleSide, Group, Mesh } from "three";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useControls } from "leva";
import { button } from "leva";

const shinningWhite = new Color(1.1, 1.1, 1.1);
const shinningRed = new Color(4.8, 0.1, 0.1);

const truckInitialPosition = 0;
const podiumInitialPosition = -0.3 / 2;
const enterAnimationDuration = 2;

export default function Experience() {
	const truckRef = useRef<Group>(null);
	const squareRef = useRef<Mesh>(null);
	const triangeRef = useRef<Mesh>(null);
	const podiumRef = useRef<Group>(null);
	const tlRef = useRef<gsap.core.Timeline>();

	useControls("General", {
		Restart: button(() => {
			tlRef.current?.restart();
		}),
	});

	useFrame((_, delta) => {
		const rotationForce = delta * 0.05;

		if (squareRef.current) {
			squareRef.current.rotation.z += rotationForce;
		}

		if (triangeRef.current) {
			triangeRef.current.rotation.z += rotationForce;
		}
	});

	useEffect(() => {
		if (truckRef.current && podiumRef.current) {
			tlRef.current = gsap
				.timeline({ defaults: { duration: enterAnimationDuration } })
				.set(truckRef.current.position, {
					y: 0,
				})
				.set(truckRef.current.rotation, {
					y: 0,
				})
				.set(podiumRef.current.position, {
					y: 0,
					z: 0,
				})
				.set(podiumRef.current.rotation, {
					x: 0,
				})
				.to(podiumRef.current.position, {
					y: -1.16,
				})
				.to(
					truckRef.current.position,
					{
						y: -1.16,
					},
					"-=100%"
				)
				.to(
					truckRef.current.rotation,
					{
						y: Math.PI * 2,
					},
					"-=100%"
				)
				.to(podiumRef.current.position, {
					z: -7,
					duration: enterAnimationDuration / 4,
				})
				.to(
					podiumRef.current.rotation,
					{
						x: Math.PI / 4,
						duration: enterAnimationDuration / 4,
					},
					"-=66%"
				)
				.to(
					podiumRef.current.position,
					{
						duration: enterAnimationDuration / 4,
					},
					"-=100%"
				);
		}
	}, []);

	return (
		<>
			<OrbitControls />

			<group ref={truckRef}>
				<CybertruckModel />
			</group>

			<hemisphereLight intensity={0.5} />
			<ContactShadows
				resolution={1024}
				position={[0, -1.16, 0]}
				scale={15}
				blur={0.5}
				opacity={1}
				frames={1}
				far={20}
			/>

			<group
				ref={podiumRef}
				position-z={-50}
				receiveShadow
			>
				<mesh
					scale={[2.54, 1, 2.5]}
					position-y={podiumInitialPosition}
				>
					<cylinderGeometry args={[1, 1, 0.3]} />
					<meshStandardMaterial
						color={"#222222"}
						metalness={0.8}
						roughness={0.4}
					/>
				</mesh>
				<mesh
					rotation-x={-Math.PI / 2}
					scale={2.8}
				>
					<ringGeometry args={[0.9, 1, 32]} />
					<meshBasicMaterial color={shinningRed} />
				</mesh>
			</group>

			<mesh
				ref={triangeRef}
				scale={4}
				rotation-x={-Math.PI / 2}
				position={[-4, -1.161, -1]}
			>
				<ringGeometry args={[0.9, 1, 3]} />
				<meshBasicMaterial
					color={shinningWhite}
					side={DoubleSide}
				/>
			</mesh>

			<mesh
				ref={squareRef}
				scale={4}
				rotation={[-Math.PI / 2, 0, Math.PI / 2]}
				position={[4, -1.161, -1.5]}
			>
				<ringGeometry args={[0.9, 1, 4]} />
				<meshBasicMaterial
					color={shinningWhite}
					side={DoubleSide}
				/>
			</mesh>

			<Environment resolution={512}>
				<Lightformer
					intensity={2}
					rotation-x={Math.PI / 2}
					position={[0, 4, -9]}
					scale={[10, 1, 1]}
				/>
				<Lightformer
					intensity={2}
					rotation-x={Math.PI / 2}
					position={[0, 4, -6]}
					scale={[10, 1, 1]}
				/>
				<Lightformer
					intensity={2}
					rotation-x={Math.PI / 2}
					position={[0, 4, -3]}
					scale={[10, 1, 1]}
				/>
				<Lightformer
					intensity={2}
					rotation-x={Math.PI / 2}
					position={[0, 4, 0]}
					scale={[10, 1, 1]}
				/>
				<Lightformer
					intensity={2}
					rotation-x={Math.PI / 2}
					position={[0, 4, 3]}
					scale={[10, 1, 1]}
				/>
				<Lightformer
					intensity={2}
					rotation-x={Math.PI / 2}
					position={[0, 4, 6]}
					scale={[10, 1, 1]}
				/>
				<Lightformer
					intensity={2}
					rotation-x={Math.PI / 2}
					position={[0, 4, 9]}
					scale={[10, 1, 1]}
				/>

				<Lightformer
					intensity={2}
					rotation-y={Math.PI / 2}
					position={[-50, 2, 0]}
					scale={[100, 2, 1]}
				/>
				<Lightformer
					intensity={2}
					rotation-y={-Math.PI / 2}
					position={[50, 2, 0]}
					scale={[100, 2, 1]}
				/>

				<Lightformer
					form="ring"
					color="red"
					intensity={10}
					scale={2}
					position={[10, 5, 10]}
					onUpdate={(self) => self.lookAt(0, 0, 0)}
				/>
			</Environment>
		</>
	);
}
