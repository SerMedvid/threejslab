import { Text, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";

import vertexShader from "../shaders/textVertex.glsl";
import fragmentShader from "../shaders/textFragment.glsl";
import { Color, Group, ShaderMaterial } from "three";
import useStore from "../store/useStore";

type Props = {
	idx: number;
	orderIdx: string;
	lineHeight: number;
	children: string;
	onlyCurrent?: boolean;
};

export default function TextItem({
	idx,
	lineHeight,
	children,
	orderIdx,
	onlyCurrent,
}: Props) {
	const scroll = useScroll();
	const shaderRef = useRef<ShaderMaterial>(null);
	const itemRef = useRef<Group>(null);

	useEffect(() => {
		if (onlyCurrent) {
			const unsubscribe = useStore.subscribe(
				(state) => state.currentIndex,
				(val) => {
					if (itemRef.current) {
						itemRef.current.visible =
							`${val + 1}`.padStart(3, "0") === orderIdx;
					}
				},
				{ fireImmediately: true }
			);

			return () => {
				unsubscribe();
			};
		}
	}, [onlyCurrent, orderIdx]);

	useFrame(() => {
		if ("__damp" in scroll && shaderRef.current) {
			shaderRef.current.uniforms.uSpeed.value = Math.max(
				Math.min((scroll.__damp as any).velocity_offset, 1),
				-1
			);
		}
	});

	return (
		<group
			position-y={idx * -lineHeight}
			ref={itemRef}
		>
			<Text
				font="/fonts/Poppins/Poppins-Black.ttf"
				color={"red"}
				anchorX={"left"}
				anchorY={"top"}
				position-y={lineHeight / 3.3}
				lineHeight={lineHeight * 0.15}
				fontSize={lineHeight * 0.15}
			>
				{orderIdx}
			</Text>
			<Text
				font="/fonts/Poppins/Poppins-Black.ttf"
				anchorX={"left"}
				position-x={0.3}
				fontSize={lineHeight}
			>
				{children}
				<shaderMaterial
					key={Date.now().toLocaleString()}
					ref={shaderRef}
					vertexShader={vertexShader}
					fragmentShader={fragmentShader}
					uniforms={{
						uSpeed: {
							value: 0,
						},
						uColor: {
							value: new Color(1, 0, 0),
						},
					}}
				/>
			</Text>
		</group>
	);
}
