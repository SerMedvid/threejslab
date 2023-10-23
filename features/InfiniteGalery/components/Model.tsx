import { useTexture, Text } from "@react-three/drei";
import { Mesh, PlaneGeometry, ShaderMaterial } from "three";

import vertexSheder from "../shaders/vertext.glsl";
import fragmentShader from "../shaders/fragment.glsl";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import useStore from "../stores/useStore";

type Props = {
	geometry: PlaneGeometry;
	img: string;
	index: number;
	text: string;
	lenght: number;
};

const PADDING_OFFSET = 2;

const mapImage = (
	num: number,
	min1: number,
	max1: number,
	min2: number,
	max2: number,
	round: boolean = false
) => {
	const num1 = (num - min1) / (max1 - min1);
	const num2 = num1 * (max2 - min2) + min2;

	return round ? Math.round(num2) : num2;
};

export default function Model({ geometry, img, index, text, lenght }: Props) {
	const meshRef = useRef<Mesh>(null);
	const texture = useTexture(img);
	const extra = useRef(0);
	const setPlaneWidth = useStore((state) => state.setPlaneWidth);

	const {
		source: {
			data: { width: imgWidth, height: imgHeight },
		},
	} = texture;

	const viewport = useThree((state) => state.viewport);
	const { width: viewportWidth } = viewport;
	const screen = useThree((state) => state.size);

	const { ratio, planeSize } = useMemo(() => {
		const { width, height } = viewport;
		const { width: screenWidth, height: screenHeight } = screen;

		const scale = screenHeight / 1500;

		const planeSize = {
			y: (height * (900 * scale)) / screenHeight,
			x: (width * (700 * scale)) / screenWidth,
		};

		return {
			ratio: [
				Math.min(planeSize.x / planeSize.y / (imgWidth / imgHeight), 1),
				Math.min(planeSize.y / planeSize.x / (imgHeight / imgWidth), 1),
			],
			planeSize,
		};
	}, [viewport, screen, imgWidth, imgHeight]);

	const meshWidthWithOffset =
		planeSize.x + Math.max((2 * viewport.width) / lenght, PADDING_OFFSET);
	const xOffet = meshWidthWithOffset * index;
	const totalWidth = meshWidthWithOffset * lenght;

	useEffect(() => {
		setPlaneWidth(meshWidthWithOffset);
		extra.current = 0;
	}, [meshWidthWithOffset, setPlaneWidth]);

	useEffect(() => {
		const unsubscribe = useStore.subscribe(
			({ offset, direction }) => ({ offset, direction }),
			({ offset, direction }) => {
				if (meshRef.current) {
					const planeOffset = meshRef.current.scale.x / 2;
					const isBefore =
						meshRef.current.position.x + planeOffset < -viewportWidth;
					const isAfter =
						meshRef.current.position.x - planeOffset > viewportWidth;

					if (direction === 1 && isBefore) extra.current -= totalWidth;
					if (direction === -1 && isAfter) extra.current += totalWidth;

					meshRef.current.position.x = xOffet - offset - extra.current;

					meshRef.current.rotation.z = mapImage(
						meshRef.current.position.x,
						-totalWidth,
						totalWidth,
						Math.PI,
						-Math.PI
					);

					meshRef.current.position.y =
						Math.cos((meshRef.current.position.x / totalWidth) * Math.PI) * 75 -
						75;
				}
			}
		);

		return () => {
			unsubscribe();
		};
	}, [viewportWidth, totalWidth, xOffet]);

	useFrame(({ clock }) => {
		if (meshRef.current && meshRef.current.material instanceof ShaderMaterial) {
			meshRef.current.material.uniforms.uTime.value = clock.elapsedTime * 2;
		}
	});

	return (
		<mesh
			geometry={geometry}
			ref={meshRef}
			scale-x={planeSize.x}
			scale-y={planeSize.y}
			position-x={xOffet}
		>
			<shaderMaterial
				key={Date.now().toString()}
				vertexShader={vertexSheder}
				fragmentShader={fragmentShader}
				transparent
				uniforms={{
					uTexture: { value: texture },
					uRatio: { value: ratio },
					uSpeed: { value: 0 },
					uTime: { value: 0 },
				}}
			/>
			<Text
				font="/assets/InfiniteGallery/freight-text-pro.woff"
				scale={0.04}
				position-z={1}
				color={"#545050"}
				position-y={-0.52}
			>
				{`0${index + 1}`}
			</Text>

			<Text
				font="/assets/InfiniteGallery/freight-text-pro.woff"
				scale={0.06}
				position-y={-0.6}
				position-z={1}
				color={"#545050"}
			>
				{text}
			</Text>
		</mesh>
	);
}
