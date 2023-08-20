"use client";

import { useFrame, useThree } from "@react-three/fiber";
import Lights from "./Lights";
import { OrbitControls, useTexture, useEnvironment } from "@react-three/drei";
import { Color, CubeTexture, Mesh, Scene, Texture, Vector3 } from "three";
import { useControls } from "leva";
import Planes from "./Planes";
import { Suspense, useEffect, useRef } from "react";
import SceneContainer from "./Scene";
import useStore from "../stores/useStore";
import { gsap } from "gsap";
import { ANIMATION_DURATION, ANIMATION_EASE } from "../constants";

type Props = {
	envMap: Texture | CubeTexture;
};

export default function PlanetScene({ envMap }: Props) {
	const { map, bumpMap, roughnessMap } = useTexture({
		map: "/assets/EarthDayAndNight/earthmap.jpg",
		bumpMap: "/assets/EarthDayAndNight/earthbump.jpg",
		roughnessMap: "/assets/EarthDayAndNight/earthspec.jpg",
	});

	const sceneRef = useRef<Scene>(null);
	const globeRef = useRef<Mesh>(null);

	const { camera } = useThree();

	useFrame(
		(state, delta) => {
			const { gl } = state;
			const time = state.clock.elapsedTime * 0.1;

			if (globeRef.current) {
				globeRef.current.rotateOnAxis(new Vector3(0, 1, 0), 0.1 * delta);
			}

			gl.autoClear = false;
			gl.render(sceneRef.current as Scene, camera);
		},

		100
	);

	const {
		bumpScale,
		sheen,
		sheenRoughness,
		clearcoat,
		envMapIntensity,
		planeCount,
	} = useControls("planet", {
		bumpScale: {
			value: 0.5,
			min: 0,
			max: 100,
			step: 0.1,
		},
		sheen: {
			value: 0.5,
			min: 0,
			max: 100,
			step: 0.1,
		},
		sheenRoughness: {
			value: 0.6,
			min: 0,
			max: 1,
			step: 0.1,
		},
		clearcoat: {
			value: 0.5,
			min: 0,
			max: 1,
			step: 0.1,
		},
		envMapIntensity: {
			value: 0.4,
			min: 0,
			max: 1,
			step: 0.1,
		},
		planeCount: {
			value: 10,
			min: 1,
			step: 1,
			max: 20,
		},
	});

	useEffect(() => {
		const unsubscribe = useStore.subscribe(
			(state) => state.isDay,
			(value) => {
				if (globeRef.current) {
					gsap.to(globeRef.current.material, {
						duration: ANIMATION_DURATION,
						ease: ANIMATION_EASE,
						sheen: value ? sheen : 0,
					});
				}
			}
		);

		return () => {
			unsubscribe();
		};
	}, [sheen]);

	return (
		<SceneContainer
			ref={sceneRef}
			environment={envMap}
		>
			<Lights />
			<Suspense fallback={null}>
				<Planes count={planeCount} />
			</Suspense>

			<mesh
				rotation-y={-Math.PI / 1.4}
				receiveShadow
				ref={globeRef}
			>
				<sphereGeometry args={[10, 70, 70]} />
				<meshPhysicalMaterial
					map={map}
					bumpMap={bumpMap}
					roughnessMap={roughnessMap}
					bumpScale={bumpScale}
					sheen={sheen}
					sheenRoughness={sheenRoughness}
					sheenColor={new Color("#ff8a00").convertSRGBToLinear()}
					envMapIntensity={envMapIntensity}
					clearcoat={clearcoat}
				/>
			</mesh>

			<OrbitControls
				dampingFactor={0.03}
				enableDamping
				makeDefault
				enableZoom={false}
			/>
		</SceneContainer>
	);
}
