import { useAspect, useTexture } from "@react-three/drei";
import useStore from "../store/useStore";
import { Mesh, ShaderMaterial, Vector2 } from "three";
import { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath";

import fragmentShader from "../shaders/fragment.glsl";
import vertexShader from "../shaders/vertex.glsl";

export default function ImageModel() {
	const slides = useStore((state) => state.slides);
	const mousePosition = useRef(new Vector2(0, 0));

	const textures = useTexture(
		slides.reduce((acc, slide) => {
			acc[slide.id] = slide.imageSrc;

			return acc;
		}, {} as Record<string, string>)
	);

	const { width, height } = useThree((state) => state.viewport);

	const aspect = useAspect(
		textures[slides[0].id].image.width,
		textures[slides[0].id].image.height,
		width > height ? 0.2 : 0.4
	);
	const materialRef = useRef<ShaderMaterial>(null);
	const meshRef = useRef<Mesh>(null);
	const image = useStore((state) => state.currentImage);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (!materialRef.current) return;

		if (!image) {
			timeoutRef.current = setTimeout(() => {
				if (!materialRef.current) return;

				materialRef.current.uniforms.uImage.value = null;
			}, 500);
		} else {
			timeoutRef.current && clearTimeout(timeoutRef.current);

			materialRef.current.uniforms.uImage.value = textures[image];
		}

		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [image, textures]);

	const [uniforms] = useState(() => ({
		uImage: { value: null },
		uOpacity: { value: 0 },
		uOffset: { value: [0, 0] },
	}));

	useEffect(() => {
		const mouseMove = (e: PointerEvent) => {
			mousePosition.current.x =
				((e.clientX - window.innerWidth / 2) / (window.innerWidth / 2)) *
				(width / 2);
			mousePosition.current.y =
				-(
					((e.clientY - window.innerHeight / 2) / (window.innerHeight / 2)) *
					height
				) / 2;
		};

		window.addEventListener("pointermove", mouseMove);

		return () => {
			window.removeEventListener("pointermove", mouseMove);
		};
	}, [width, height]);

	useFrame((_, delta) => {
		if (!materialRef.current || !meshRef.current) return;

		const position = meshRef.current.position;
		const targetX = mousePosition.current.x;
		const targetY = mousePosition.current.y;

		easing.damp3(position, [targetX, targetY, position.z], 0.1, delta);

		easing.damp(
			materialRef.current.uniforms.uOpacity,
			"value",
			image ? 1 : 0,
			0.2,
			delta
		);

		materialRef.current.uniforms.uOffset.value = [
			targetX - position.x,
			targetY - position.y,
		];
	});

	return (
		<mesh
			scale={aspect}
			ref={meshRef}
		>
			<planeGeometry args={[1, 1, 100, 100]} />
			<shaderMaterial
				key={Date.now()}
				ref={materialRef}
				uniforms={uniforms}
				transparent
				vertexShader={vertexShader}
				fragmentShader={fragmentShader}
			/>
		</mesh>
	);
}

useStore.getState().slides.map((slide) => useTexture.preload(slide.imageSrc));
