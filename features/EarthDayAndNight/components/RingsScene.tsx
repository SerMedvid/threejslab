import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import {
	Camera,
	Color,
	CubeTexture,
	DoubleSide,
	Mesh,
	Scene,
	Texture,
	PerspectiveCamera as PerspectiveCameraThree,
} from "three";
import SceneContainer from "./Scene";
import useStore from "../stores/useStore";
import { gsap } from "gsap";
import { ANIMATION_DURATION, ANIMATION_EASE } from "../constants";

type Props = {
	envMap: Texture | CubeTexture;
};

export default function RingsScene({ envMap }: Props) {
	const sceneRef = useRef<Scene>(null);
	const cameraRef = useRef<PerspectiveCameraThree>(null);
	const ring1Ref = useRef<Mesh>(null);
	const ring2Ref = useRef<Mesh>(null);
	const ring3Ref = useRef<Mesh>(null);

	useFrame((state) => {
		const { gl, pointer } = state;

		const standartMousePosition = {
			x: pointer.x * 0.1,
			y: pointer.y * 0.1,
		};

		if (ring1Ref.current) {
			ring1Ref.current.rotation.x =
				ring1Ref.current.rotation.x * 0.95 +
				standartMousePosition.y * 0.05 * 1.2;
			ring1Ref.current.rotation.y =
				ring1Ref.current.rotation.y * 0.95 +
				standartMousePosition.x * 0.05 * 1.2;
		}

		if (ring2Ref.current) {
			ring2Ref.current.rotation.x =
				ring2Ref.current.rotation.x * 0.95 +
				standartMousePosition.y * 0.05 * 0.375;
			ring2Ref.current.rotation.y =
				ring2Ref.current.rotation.y * 0.95 +
				standartMousePosition.x * 0.05 * 0.375;
		}

		if (ring3Ref.current) {
			ring3Ref.current.rotation.x =
				ring3Ref.current.rotation.x * 0.95 -
				standartMousePosition.y * 0.05 * 0.275;
			ring3Ref.current.rotation.y =
				ring3Ref.current.rotation.y * 0.95 -
				standartMousePosition.x * 0.05 * 0.275;
		}

		gl.autoClear = true;
		gl.clearDepth(),
			gl.render(sceneRef.current as Scene, cameraRef.current as Camera);
	}, 10);

	useEffect(() => {
		const unsubscribe = useStore.subscribe(
			(state) => state.isDay,
			(value) => {
				if (ring1Ref.current) {
					gsap.to(ring1Ref.current.material, {
						duration: ANIMATION_DURATION,
						ease: ANIMATION_EASE,
						opacity: value ? 0.35 : 0.03,
					});
				}

				if (ring2Ref.current) {
					gsap.to(ring2Ref.current.material, {
						duration: ANIMATION_DURATION,
						ease: ANIMATION_EASE,
						opacity: value ? 0.35 : 0.1,
					});
				}

				if (ring3Ref.current) {
					gsap.to(ring3Ref.current.material, {
						duration: ANIMATION_DURATION,
						ease: ANIMATION_EASE,
						opacity: value ? 0.35 : 0.03,
					});
				}
			}
		);

		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<SceneContainer
			ref={sceneRef}
			environment={envMap}
		>
			<PerspectiveCamera
				ref={cameraRef}
				position={[0, 0, 50]}
				far={1000}
				near={0.1}
				fov={45}
			/>

			<mesh ref={ring1Ref}>
				<ringGeometry args={[15, 13.5, 80, 1, 0]} />
				<meshPhysicalMaterial
					color={new Color("#FFCBBE").convertSRGBToLinear().multiplyScalar(200)}
					roughness={0.25}
					envMapIntensity={1.8}
					side={DoubleSide}
					transparent
					opacity={0.35}
				/>
			</mesh>
			<mesh ref={ring2Ref}>
				<ringGeometry args={[16.5, 15.75, 80, 1, 0]} />
				<meshBasicMaterial
					color={new Color("#FFCBBE").convertSRGBToLinear()}
					side={DoubleSide}
					transparent
					opacity={0.5}
				/>
			</mesh>
			<mesh ref={ring3Ref}>
				<ringGeometry args={[18, 17.75, 80]} />
				<meshBasicMaterial
					color={new Color("#FFCBBE").convertSRGBToLinear().multiplyScalar(50)}
					side={DoubleSide}
					transparent
					opacity={0.5}
				/>
			</mesh>
		</SceneContainer>
	);
}
