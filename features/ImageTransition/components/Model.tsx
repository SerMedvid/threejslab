import { useTexture } from "@react-three/drei";
import vertexShader from "../shaders/vertex.glsl";
import fragmentShader from "../shaders/fragment.glsl";
import { useRef, useState } from "react";
import { MeshProps, extend, useFrame } from "@react-three/fiber";
import { MathUtils, ShaderMaterial } from "three";
import { geometry, easing } from "maath";

type Props = MeshProps & {
	imgStart: string;
	imgEnd: string;
	imgDisplacement: string;
	effectFactor?: number;
};

extend({ RoundedPlaneGeometry: geometry.RoundedPlaneGeometry });

export default function Model({
	imgStart,
	imgEnd,
	imgDisplacement,
	effectFactor = 0.5,
	...rest
}: Props) {
	const [hovered, setHovered] = useState(false);
	const matRef = useRef<ShaderMaterial>(null);
	const displRef = useRef(0);

	const { textureStart, textureEnd, textureDisp } = useTexture({
		textureStart: imgStart,
		textureEnd: imgEnd,
		textureDisp: imgDisplacement,
	});

	useFrame((_, delta) => {
		if (matRef.current) {
			easing.damp(displRef, "current", hovered ? 1 : 0, 0.25, delta);

			matRef.current.uniforms.uDispFactor.value = displRef.current;
		}
	});

	return (
		<mesh
			{...rest}
			onPointerEnter={() => setHovered(true)}
			onPointerLeave={() => setHovered(false)}
		>
			<shaderMaterial
				key={Date.now().toString()}
				ref={matRef}
				vertexShader={vertexShader}
				fragmentShader={fragmentShader}
				uniforms={{
					uTextureStart: { value: textureStart },
					uTextureEnd: { value: textureEnd },
					uTextureDisp: { value: textureDisp },
					uEffectFactor: { value: effectFactor },
					uDispFactor: { value: displRef.current },
				}}
			/>
			<roundedPlaneGeometry args={[2.25, 4]} />
		</mesh>
	);
}
