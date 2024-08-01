import React, { useEffect, useRef } from "react";

import vertexShader from "../shaders/vertex.glsl";
import fragmentShader from "../shaders/fragment.glsl";
import { Html, useTexture } from "@react-three/drei";
import { Group, ShaderMaterial, Vector2 } from "three";
import gsap from "gsap";
import { ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import useStore from "../store/useStore";

type Props = {
	img: string;
	index: number;
	prompt: string;
};

const HEIGHT_MODIFIER = 1.87;
const WIDTH_PIXEL_RATIO = 8;

export default function Slide({ img, index, prompt }: Props) {
	const texture = useTexture(img);
	const { width } = useThree((state) => state.size);
	const { width: viewportWidth } = useThree((state) => state.viewport);

	const widthModifier = width < 700 ? 2 : 4;

	const ref = useRef<Group>(null);
	const materialRef = useRef<ShaderMaterial>(null);
	const tweenRef = useRef<gsap.core.Timeline>();
	const isHovered = useRef(false);

	const setIsHovered = useStore((state) => state.setIsHovered);
	const slidesLength = useStore((state) => state.slides.length);
	const planeWidth = viewportWidth / widthModifier;
	const planeSpace = planeWidth * 2 + viewportWidth * 0.2;

	const startPosition = index * planeSpace;

	const handlePixaleted = (pixalated = false) => {
		if (materialRef.current?.uniforms) {
			tweenRef.current?.clear();
			tweenRef.current?.kill();

			tweenRef.current = gsap
				.timeline()
				.to(materialRef.current.uniforms.uPixelRatio.value, {
					x: pixalated ? WIDTH_PIXEL_RATIO : width / widthModifier,
					y:
						HEIGHT_MODIFIER *
						(pixalated ? WIDTH_PIXEL_RATIO : width / widthModifier),
					duration: 0.5,
					ease: pixalated ? "power2.out" : "power2.in",
				});
		}
	};

	const onHoverEnter = (e: ThreeEvent<PointerEvent>) => {
		e.stopPropagation();
		setIsHovered(true);
		handlePixaleted(false);
	};

	const onHoverLeave = (e: ThreeEvent<PointerEvent>) => {
		e.stopPropagation();

		setIsHovered(false);
		handlePixaleted(true);
	};

	useEffect(() => {
		const unsubscribe = useStore.subscribe(
			(state) => state.isHovered,
			(val) => {
				isHovered.current = val;
			}
		);

		return () => {
			unsubscribe();
		};
	}, []);

	useEffect(() => {
		if (ref.current) {
			ref.current.position.x = startPosition;
		}
	}, [width]);

	useFrame((_, delta) => {
		if (ref.current) {
			if (!isHovered.current) {
				ref.current.position.x += -delta * 2.5;
			}

			if (ref.current.position.x < -viewportWidth / 2 - planeSpace) {
				ref.current.position.x = (slidesLength - 1.667) * planeSpace;
			}
		}
	});

	return (
		<group
			ref={ref}
			position-x={startPosition}
		>
			<mesh
				scale={[planeWidth, planeWidth * HEIGHT_MODIFIER, 1]}
				position-x={-planeWidth / 2}
				onPointerDown={onHoverEnter}
				onPointerUp={onHoverLeave}
				onPointerEnter={onHoverEnter}
				onPointerLeave={onHoverLeave}
			>
				<planeGeometry args={[1, 1]} />
				<shaderMaterial
					ref={materialRef}
					key={Date.now()}
					vertexShader={vertexShader}
					fragmentShader={fragmentShader}
					uniforms={{
						uTexture: { value: texture },
						uPixelRatio: {
							value: new Vector2(
								WIDTH_PIXEL_RATIO,
								WIDTH_PIXEL_RATIO * HEIGHT_MODIFIER
							),
						},
						uTexureResolution: {
							value: [texture.image.width, texture.image.height],
						},
						uPlaneResolution: {
							value: [planeWidth, planeWidth * HEIGHT_MODIFIER],
						},
					}}
				/>
			</mesh>
			<Html
				position-x={planeWidth / 2}
				style={{ pointerEvents: "none" }}
			>
				<p
					className="text-gray-100	  overflow-hidden text-sm"
					style={{
						height: `${HEIGHT_MODIFIER * (width / widthModifier)}px`,
						transform: `translate(-50%, -${
							(HEIGHT_MODIFIER * (width / widthModifier)) / 2
						}px)`,
						width: `${(width / widthModifier) * 0.85}px`,
						display: "flex",
						alignItems: index % 2 ? "start" : "end",
					}}
				>
					{prompt}
				</p>
			</Html>
		</group>
	);
}
