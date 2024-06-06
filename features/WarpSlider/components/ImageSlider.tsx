import { useTexture } from "@react-three/drei";
import { extend, useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import {
	ImageSliderMaterial,
	ImageSliderMaterialT,
} from "./ImageSliderMaterial";
import useStore, { Direction } from "../store/useStore";
import { MathUtils, MirroredRepeatWrapping } from "three";
import { useSpring } from "framer-motion";

type Props = {
	width?: number;
	height?: number;
	fillPercent?: number;
};

extend({ ImageSliderMaterial });

export const PUSH_FORCE = 1.4;

export default function ImageSlider({
	width = 3,
	height = 4,
	fillPercent = 0.75,
}: Props) {
	const image = useStore((state) => state.items[state.curSlide].image);
	const direction = useStore((state) => state.direction);
	const texture = useTexture(image);
	const displacementTexture = useTexture(
		"/assets/WarpSlider/textures/optimized/displacement.jpg"
	);

	const [lastImage, setLastImage] = useState(image);
	const prevTexture = useTexture(lastImage);

	texture.wrapS =
		texture.wrapT =
		prevTexture.wrapS =
		prevTexture.wrapT =
			MirroredRepeatWrapping;

	const [transition, setTransition] = useState(true);

	const hoveredRef = useRef(false);
	const materrialRef = useRef<ImageSliderMaterialT>(null);

	const progression = useSpring(0, {
		stiffness: 1500,
		damping: 250,
		mass: 2,
	});

	useEffect(() => {
		const newImage = image;
		progression.jump(0);
		progression.set(1);

		if (materrialRef.current) {
			materrialRef.current.uProgression = 0;
		}
		setTransition(true);
		const timeout = setTimeout(() => {
			setTransition(false);
		}, 1600);

		return () => {
			setLastImage(newImage);
			clearTimeout(timeout);
		};
	}, [image, progression]);

	useFrame(({ pointer }) => {
		if (materrialRef.current) {
			materrialRef.current.uProgression = progression.get();

			materrialRef.current.uMousePosition = [
				MathUtils.lerp(
					materrialRef.current.uMousePosition[0],
					transition
						? (direction === Direction.PREV ? 1 : -1) *
								materrialRef.current.uProgression
						: pointer.x,
					0.05
				),
				MathUtils.lerp(
					materrialRef.current.uMousePosition[1],
					transition ? -1 * materrialRef.current.uProgression : pointer.y,
					0.05
				),
			];

			materrialRef.current.uPushForce = MathUtils.lerp(
				materrialRef.current.uPushForce,
				transition
					? -PUSH_FORCE *
							1.52 *
							Math.sin(materrialRef.current.uProgression * Math.PI)
					: hoveredRef.current
					? PUSH_FORCE
					: 0,
				0.05
			);
		}
	});

	const viewport = useThree((state) => state.viewport);
	const ratio =
		viewport.width / fillPercent < viewport.height
			? viewport.width / (width / fillPercent)
			: viewport.height / (height / fillPercent);

	return (
		<mesh
			onPointerEnter={() => {
				hoveredRef.current = true;
			}}
			onPointerLeave={() => {
				hoveredRef.current = false;
			}}
		>
			<planeGeometry args={[width * ratio, height * ratio, 32, 32]} />
			<imageSliderMaterial
				ref={materrialRef}
				uTexture={texture}
				uPrevTexture={prevTexture}
				uDirection={direction === Direction.NEXT ? 1 : -1}
				uDisplacementTexture={displacementTexture}
				transparent
			/>
		</mesh>
	);
}

useStore.getState().items.forEach((item) => {
	useTexture.preload(item.image);
});
useTexture.preload("/assets/WarpSlider/textures/optimized/displacement.jpg");
