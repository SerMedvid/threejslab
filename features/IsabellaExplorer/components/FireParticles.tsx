import { useTexture } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import {
	AdditiveBlending,
	BufferAttribute,
	BufferGeometry,
	Color,
	MathUtils,
	PerspectiveCamera,
	RepeatWrapping,
	ShaderMaterial,
	Uniform,
} from "three";

type Props = {
	radius: number;
	height: number;
	particleCount: number;
};

const SPRITE_ROW_LENGTH = 4;
const ONE_SPRITE_ROW_LENGTH = 1 / SPRITE_ROW_LENGTH;

import vertexShader from "../shaders/fire/vertexShader.glsl";
import fragmentShader from "../shaders/fire/fragmentShader.glsl";
import { useFrame, useThree } from "@react-three/fiber";

export default function FireParticles({
	radius,
	height,
	particleCount,
}: Props) {
	const materialRef = useRef<ShaderMaterial>(null);

	const texture = useTexture(
		"/assets/VendingMachine/fire_sprite.png",
		(tex) => {
			tex.wrapS = tex.wrapT = RepeatWrapping;
		}
	);

	const { positionAttribute, randomAttribute, spriteAttribute } =
		useMemo(() => {
			const halfHeight = height * 0.5;
			const position = new Float32Array(particleCount * 3);
			const random = new Float32Array(particleCount);
			const sprite = new Float32Array(particleCount);

			for (let i = 0; i < particleCount; i++) {
				const r = Math.sqrt(Math.random()) * radius;
				const angle = Math.random() * 2 * Math.PI;
				position[i * 3 + 0] = Math.cos(angle) * r;
				position[i * 3 + 1] = ((radius - r) / radius) * halfHeight + halfHeight;
				position[i * 3 + 2] = Math.sin(angle) * r;
				sprite[i] = ONE_SPRITE_ROW_LENGTH * ((Math.random() * 4) | 0);
				random[i] = Math.random();

				if (i === 0) {
					// to avoid going out of Frustum
					position[i * 3 + 0] = 0;
					position[i * 3 + 1] = 0;
					position[i * 3 + 2] = 0;
				}
			}

			return {
				positionAttribute: new BufferAttribute(position, 3),
				randomAttribute: new BufferAttribute(random, 1),
				spriteAttribute: new BufferAttribute(sprite, 1),
			};
		}, [height, particleCount, radius]);

	const windowHeight = useThree((state) => state.size.height);
	const fov = useThree((state) => (state.camera as PerspectiveCamera).fov);
	const gl = useThree((state) => state.gl);

	const [staticUniforms] = useState(() => ({
		color: new Uniform(new Color("#ff7d46")),
		size: new Uniform(0.1 * gl.getPixelRatio()),
		map: new Uniform(texture),
		time: new Uniform(0),
		spriteRowLenght: new Uniform(ONE_SPRITE_ROW_LENGTH),
	}));

	useFrame(({ clock, camera }) => {
		if (materialRef.current) {
			materialRef.current.uniforms.time.value = (clock.elapsedTime * 0.2) % 1;
		}
	});

	return (
		<points>
			<bufferGeometry
				attributes={{
					position: positionAttribute,
					random: randomAttribute,
					sprite: spriteAttribute,
				}}
			/>

			<shaderMaterial
				toneMapped={false}
				ref={materialRef}
				key={Date.now()}
				vertexShader={vertexShader}
				fragmentShader={fragmentShader}
				depthWrite={false}
				transparent
				blending={AdditiveBlending}
				uniforms={{
					...staticUniforms,
					heightOfNearPlane: new Uniform(
						Math.abs(
							windowHeight / (2 * Math.tan(MathUtils.degToRad(fov * 0.5)))
						)
					),
				}}
			/>
		</points>
	);
}
