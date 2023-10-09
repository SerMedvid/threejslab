import {
	AccumulativeShadows,
	Environment,
	Lightformer,
	OrbitControls,
	PerspectiveCamera,
	RandomizedLight,
	Sphere,
	useGLTF,
} from "@react-three/drei";
import { SceneSlide } from "../data";

import { DoubleSide } from "three";
import { DEG2RAD } from "three/src/math/MathUtils.js";

import { GLTF } from "three-stdlib";
import { useEffect } from "react";

type GLTFResult = GLTF & {
	nodes: Record<string, any>;
	materials: Record<string, any>;
};

export default function Scene({ path, mainColor }: SceneSlide) {
	const { scene } = useGLTF(path) as GLTFResult;

	useEffect(() => {
		scene.traverse((child) => {
			if ("isMesh" in child && child.isMesh) {
				child.castShadow = true;
				child.receiveShadow = true;
			}
		});
	}, [scene]);

	const ratioScale = Math.min(1.2, Math.max(0.5, window.innerWidth / 1920));

	return (
		<>
			<color
				attach="background"
				args={["#ffffff"]}
			/>
			<group dispose={null}>
				<PerspectiveCamera
					makeDefault
					position={[3, 3, 8]}
					near={0.5}
				/>
				<OrbitControls
					autoRotate
					enablePan={false}
					maxPolarAngle={DEG2RAD * 75}
					minDistance={6}
					maxDistance={10}
					autoRotateSpeed={0.5}
				/>

				<primitive
					object={scene}
					scale={ratioScale}
				/>
				<ambientLight
					intensity={0.1}
					color="pink"
				/>

				<AccumulativeShadows
					frames={100}
					alphaTest={0.9}
					scale={30}
					position={[0, -0.005, 0]}
					color="pink"
					opacity={0.8}
				>
					<RandomizedLight
						amount={4}
						radius={9}
						intensity={4}
						ambient={0.25}
						position={[10, 5, 15]}
					/>
					<RandomizedLight
						amount={4}
						radius={5}
						intensity={1}
						position={[-5, 5, 15]}
						bias={0.001}
					/>
				</AccumulativeShadows>

				<Environment
					blur={0.8}
					background
				>
					<Sphere scale={15}>
						<meshBasicMaterial
							color={mainColor}
							side={DoubleSide}
						/>
					</Sphere>
					<Lightformer
						position={[5, 0, -5]}
						form={"rect"}
						intensity={1}
						color={"red"}
						scale={[3, 5, 1]}
						target={[0, 0, 0]}
					/>

					<Lightformer
						position={[-5, 0, 1]}
						form={"circle"}
						intensity={1}
						color={"green"}
						scale={[2, 5, 1]}
						target={[0, 0, 0]}
					/>

					<Lightformer
						position={[0, 5, -2]}
						form="ring"
						intensity={0.5}
						color="orange"
						scale={[10, 5, 1]}
						target={[0, 0, 0]}
					/>
					<Lightformer
						position={[0, 0, 5]}
						form="rect"
						intensity={1}
						color="purple"
						scale={[10, 5, 1]}
						target={[0, 0, 0]}
					/>
				</Environment>
			</group>
		</>
	);
}

useGLTF.preload("/assets/3dCarSlider/cars/car_scene_1.gltf");
useGLTF.preload("/assets/3dCarSlider/cars/car_scene_2.gltf");
useGLTF.preload("/assets/3dCarSlider/cars/car_scene_3.gltf");
