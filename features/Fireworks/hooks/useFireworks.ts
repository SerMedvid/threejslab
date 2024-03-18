import { useTexture } from "@react-three/drei";
import { useCallback, useEffect } from "react";
import {
	AdditiveBlending,
	BufferGeometry,
	Color,
	Float32BufferAttribute,
	PointLight,
	Points,
	ShaderMaterial,
	Spherical,
	Texture,
	Uniform,
	Vector2,
	Vector3,
} from "three";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";

import vertexShader from "../shaders/vertexShader.glsl";
import fragmentShader from "../shaders/fragmentShader.glsl";
import useStore from "../stores/useStore";

type CreateFireworkProps = {
	count: number;
	position: Vector3;
	size: number;
	texture: Texture;
	radius: number;
	color: Color;
};

export default function useFireworks() {
	const scene = useThree((state) => state.scene);
	const sizes = useThree((state) => state.size);
	const gl = useThree((state) => state.gl);
	const firePressed = useStore((state) => state.clicked);

	const textures = useTexture(
		[
			"/assets/Firework/particles/1.png",
			"/assets/Firework/particles/2.png",
			"/assets/Firework/particles/3.png",
			"/assets/Firework/particles/4.png",
			"/assets/Firework/particles/5.png",
			"/assets/Firework/particles/6.png",
			"/assets/Firework/particles/7.png",
			"/assets/Firework/particles/8.png",
		],
		(textures) => {
			if (Array.isArray(textures)) {
				textures.forEach((texture) => {
					texture.flipY = false;
				});
			} else {
				textures.flipY = false;
			}
		}
	);

	const createFirework = useCallback(
		({
			count,
			position,
			size,
			texture,
			radius,
			color,
		}: CreateFireworkProps) => {
			const pixelRatio = gl.getPixelRatio();

			const positionsArray = new Float32Array(count * 3);
			const sizessArray = new Float32Array(count);
			const timeMultipliersArray = new Float32Array(count);

			const spherical = new Spherical();
			const sphericalPosition = new Vector3();

			for (let i = 0; i < count; i++) {
				const i3 = i * 3;

				spherical.set(
					radius * (0.75 + Math.random() * 0.25),
					Math.random() * Math.PI,
					Math.random() * Math.PI * 2
				);
				sphericalPosition.setFromSpherical(spherical);

				positionsArray[i3] = sphericalPosition.x;
				positionsArray[i3 + 1] = sphericalPosition.y;
				positionsArray[i3 + 2] = sphericalPosition.z;

				sizessArray[i] = Math.random();
				timeMultipliersArray[i] = 1 + Math.random();
			}

			const geometry = new BufferGeometry();
			geometry.setAttribute(
				"position",
				new Float32BufferAttribute(positionsArray, 3)
			);
			geometry.setAttribute(
				"aSize",
				new Float32BufferAttribute(sizessArray, 1)
			);
			geometry.setAttribute(
				"aTimeMultiplier",
				new Float32BufferAttribute(timeMultipliersArray, 1)
			);

			const material = new ShaderMaterial({
				vertexShader,
				fragmentShader,
				transparent: true,
				depthWrite: false,
				blending: AdditiveBlending,
				uniforms: {
					uSize: new Uniform(size),
					uResolution: new Uniform(
						new Vector2(sizes.width * pixelRatio, sizes.height * pixelRatio)
					),
					uTexture: new Uniform(texture),
					uColor: new Uniform(color),
					uProgress: new Uniform(0),
				},
			});

			const firework = new Points(geometry, material);
			firework.position.copy(position);
			scene.add(firework);

			const destroy = () => {
				firework.removeFromParent();
				geometry.dispose();
				material.dispose();
			};

			const light = new PointLight(color, 0);
			light.castShadow = true;
			light.position.copy(position);

			scene.add(light);

			const destroyLight = () => {
				light.removeFromParent();
			};

			gsap
				.timeline()
				.to(material.uniforms.uProgress, {
					value: 1,
					duration: 3,
					ease: "linear",
					onComplete: destroy,
				})
				.to(
					light,
					{
						intensity: 250,
						duration: 0.3,
						ease: "power3.out",
					},
					"-=3"
				)
				.to(
					light,
					{
						intensity: 0,
						duration: 1,
						ease: "linear",
						onComplete: destroyLight,
					},
					">"
				);
		},
		[gl, scene, sizes]
	);

	const createRandomFirework = useCallback(() => {
		const count = Math.round(400 + Math.random() * 1000);
		const position = new Vector3(
			(Math.random() - 0.5) * 4,
			Math.random() + 3,
			(Math.random() - 0.5) * 4
		);
		const size = 0.1 + Math.random() * 0.1;
		const texture = textures[Math.floor(Math.random() * textures.length)];
		const radius = Math.random() + 1;
		const color = new Color();
		color.setHSL(Math.random(), 1, 0.7);

		createFirework({ count, position, size, texture, radius, color });
	}, [createFirework]);

	useEffect(() => {
		if (firePressed) {
			createRandomFirework();
		}
	}, [createRandomFirework, firePressed, textures]);
}
