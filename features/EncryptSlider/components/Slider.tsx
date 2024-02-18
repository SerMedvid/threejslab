import vertexShader from "../shaders/blendVertex.glsl";
import fragmentShader from "../shaders/blendFrag.glsl";
import { useThree } from "@react-three/fiber";
import { RenderTexture, useTexture } from "@react-three/drei";
import { ShaderMaterial, Texture } from "three";
import { useEffect, useRef } from "react";
import SliderGroup from "./SliderGroup";
import SliderText from "./SliderText";
import SliderImages from "./SliderImages";
import useStore from "../store/useStore";

export type VisualData = {
	texture: Texture;
	width: number;
	height: number;
	offset: number;
};

type Props = JSX.IntrinsicElements["group"] & {
	imagesSrc: string[];
	containerPercentHeight?: number;
};

export default function Slider({
	imagesSrc,
	containerPercentHeight = 0.33,
	...props
}: Props) {
	const textures = useTexture(imagesSrc);

	const { height: viewportHeight, width: viewportWidth } = useThree(
		(state) => state.viewport
	);

	const setHeight = useStore((state) => state.setHeight);

	const { images, offset } = textures.reduce(
		(accum, texture) => {
			const height = viewportHeight * containerPercentHeight;
			const width = height * (texture.image.width / texture.image.height);
			const offset = viewportWidth - width;
			const offsetX = accum.offset + width + offset;

			accum.images.push({
				texture,
				width,
				height: height,
				offset: offsetX - width / 2,
			});

			accum.offset = offsetX;

			return accum;
		},
		{ images: [] as VisualData[], offset: 0 }
	);

	const firstImage = images[0];
	const materialRef = useRef<ShaderMaterial>(null);

	const firstElementOffset = firstImage.offset + firstImage.width / 2;

	useEffect(() => {
		setHeight(firstImage.height);
	}, [firstImage.height, setHeight]);

	return (
		<group {...props}>
			<mesh scale={[viewportWidth, viewportHeight, 1]}>
				<planeGeometry args={[1, 1]} />
				<shaderMaterial
					transparent
					key={Date.now().toString()}
					ref={materialRef}
					vertexShader={vertexShader}
					fragmentShader={fragmentShader}
					uniforms={{
						uImageTexture: {
							value: null,
						},
						uTextTexture: {
							value: null,
						},
					}}
				>
					<RenderTexture
						sourceFile={undefined}
						attach={"uniforms-uImageTexture-value"}
					>
						<SliderGroup
							firstElementOffset={firstElementOffset}
							totalOffset={offset}
						>
							<SliderImages items={images} />
						</SliderGroup>
					</RenderTexture>

					<RenderTexture
						sourceFile={undefined}
						attach={"uniforms-uTextTexture-value"}
					>
						<SliderGroup
							firstElementOffset={firstElementOffset}
							totalOffset={offset}
						>
							<SliderText items={images} />
						</SliderGroup>
					</RenderTexture>
				</shaderMaterial>
			</mesh>
		</group>
	);
}
