import { Color, ShaderMaterial } from "three";
import { useTexture } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import useStore from "../../stores/useStore";
import gsap from "gsap";

import fragmentShader from "../../shaders/fakeShadow/fragment.glsl";
import vertexShader from "../../shaders/fakeShadow/vertex.glsl";

type Props = JSX.IntrinsicElements["mesh"] & {
	color: string;
	slide: number;
	opacity?: number;
};

export default function FakeShadow({
	color,
	opacity,
	slide,
	scale = 4,
	...props
}: Props) {
	const materialRef = useRef<ShaderMaterial>(null);

	const texture = useTexture("/assets/ProductShowcase/frostglass2.jpg");

	useEffect(() => {
		const unsubscribe = useStore.subscribe(
			(state) => ({
				currentSlide: state.slide,
				totalSlides: state.totalSlides,
			}),
			({ currentSlide, totalSlides }) => {
				if (materialRef.current) {
					if (currentSlide === slide) {
						gsap.to(materialRef.current.uniforms.uIntencity, {
							delay: 0.3,
							value: opacity,
							duration: 1,
						});
					} else if (currentSlide === (slide + 1) % totalSlides) {
						gsap.to(materialRef.current.uniforms.uIntencity, {
							value: 0,
							duration: 0.5,
						});
					}
				}
			},
			{ fireImmediately: true }
		);

		return () => {
			unsubscribe();
		};
	}, [opacity]);

	const [staticUniforms] = useState(() => ({
		uIntencity: { value: 0 },
	}));

	return (
		<group>
			<mesh
				position-y={-1.5}
				position-x={0.75}
				scale={scale}
				{...props}
			>
				<planeGeometry args={[1, 1]} />
				<shaderMaterial
					ref={materialRef}
					toneMapped={false}
					key={color}
					transparent
					fragmentShader={fragmentShader}
					vertexShader={vertexShader}
					uniforms={{
						uTexture: { value: texture },
						uColor: { value: new Color(color) },
						...staticUniforms,
					}}
				/>
			</mesh>
		</group>
	);
}
