/* eslint-disable jsx-a11y/alt-text */
import { Float, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";

import { list } from "../data";
import { DoubleSide, Mesh, MeshBasicMaterial, SphereGeometry } from "three";
import useStore from "../store/useStore";

export default function Cover() {
	const ref = useRef<Mesh<SphereGeometry, MeshBasicMaterial>>(null);

	const textures = useTexture(list.map(({ cover }) => cover));
	const currentTexture = useRef(0);

	const currentIndexRef = useRef(0);
	const currentIndexOffsetRef = useRef(0);

	useEffect(() => {
		const unsubscribe = useStore.subscribe(
			(state) => state.currentIndex,
			(val) => {
				currentIndexRef.current = val;
			},
			{ fireImmediately: true }
		);

		return () => {
			unsubscribe();
		};
	}, []);

	useEffect(() => {
		const unsubscribe = useStore.subscribe(
			(state) => state.currentIndexOffset,
			(val) => {
				currentIndexOffsetRef.current = val;
			},
			{ fireImmediately: true }
		);
		return () => {
			unsubscribe();
		};
	}, []);

	useFrame(() => {
		const currentIndexOffset = currentIndexOffsetRef.current;

		const currentIndex = currentIndexRef.current;

		const offset = currentIndexOffset % 1;

		let rotationPower = Math.abs(Math.abs((offset - 0.5) * 2));

		let rotationOffset =
			offset + 0.5 * Math.pow(Math.pow(rotationPower, 1 / 3), 3) - 0.5;

		if (ref.current) {
			ref.current.rotation.y = rotationOffset * Math.PI * 2;
		}

		if (
			ref.current?.material &&
			ref.current.material instanceof MeshBasicMaterial
		) {
			ref.current.material.map = textures[currentIndex];
		}
	});

	return (
		<>
			<Float>
				<mesh
					position-z={-4.5}
					scale={[2.5, 2.5 * 1.57, 1]}
					scale-z={2.5}
					ref={ref}
				>
					<meshBasicMaterial
						map={textures[currentTexture.current]}
						side={DoubleSide}
					/>
					<sphereGeometry args={[2.5, 60, 60, 1.5, 0.2, 1.5, 0.2]} />
				</mesh>
			</Float>
		</>
	);
}

list.forEach(({ cover }) => {
	useTexture.preload(cover);
});
