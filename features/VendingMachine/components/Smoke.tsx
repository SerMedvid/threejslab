import { forwardRef, useEffect, useRef } from "react";
import {
	CylinderGeometry,
	DoubleSide,
	Mesh,
	RepeatWrapping,
	ShaderMaterial,
	Texture,
} from "three";

import { useTexture } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import {
	SmokeMaterial,
	SmokeMaterialT,
} from "@/components/materials/SmokeMaterial";

type Props = JSX.IntrinsicElements["group"] & {
	speed?: number;
	density?: number;
	rotationSpeed?: number;
	color?: [number, number, number];
	seed?: number;
};

extend({ SmokeMaterial });

const Smoke = forwardRef<Mesh<CylinderGeometry, ShaderMaterial>, Props>(
	(
		{
			speed = 1,
			density = 0.6,
			rotationSpeed = 0.005,
			color = [1, 1, 1],
			seed = 1,
			...rest
		},
		ref
	) => {
		const smokeInnerRef = useRef<Mesh<CylinderGeometry, ShaderMaterial>>(null);
		const smokeRef = ref ? ref : smokeInnerRef;

		const materialRef = useRef<SmokeMaterialT>(null);
		const geometryRef = useRef<CylinderGeometry>(null);

		const texture = useTexture("/assets/perlin.png", (texture) => {
			if (texture instanceof Texture) {
				texture.wrapS = RepeatWrapping;
				texture.wrapT = RepeatWrapping;
			}
		});

		useEffect(() => {
			if (geometryRef.current) {
				geometryRef.current.translate(0, 0.5, 0);
				geometryRef.current.scale(1, 3, 1);
			}
		}, []);

		useFrame((_, delta) => {
			if (materialRef.current) {
				materialRef.current.time += delta;
			}
		});

		return (
			<group {...rest}>
				<mesh ref={smokeRef}>
					<cylinderGeometry
						args={[0.4, 1, 1, 16, 64, true]}
						ref={geometryRef}
					/>
					<smokeMaterial
						toneMapped={false}
						key={Date.now()}
						transparent
						ref={materialRef}
						uniforms={{
							time: { value: 0 },
							perlinTexture: { value: texture },
							speed: { value: speed },
							rotationSpeed: { value: rotationSpeed },
							density: { value: density },
							color: { value: color },
							seed: { value: seed },
						}}
						side={DoubleSide}
						depthWrite={false}
					/>
				</mesh>
			</group>
		);
	}
);

Smoke.displayName = "Smoke";

export default Smoke;
