import React, { useEffect, useMemo, useRef } from "react";
import { PageTransitionPlane } from "../data";
import {
	DoubleSide,
	Mesh,
	PlaneGeometry,
	ShaderMaterial,
	Vector4,
} from "three";
import { ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import { Html, Text, useTexture } from "@react-three/drei";

import fragmentShader from "../shaders/fragment.glsl";
import vertexShader from "../shaders/vertex.glsl";

import gsap from "gsap";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { usePlaneDimension } from "../hooks/usePlaneDimension";

type Props = PageTransitionPlane & { geometry: PlaneGeometry; index: number };

export default function Model({ id, img, title, url, geometry, index }: Props) {
	const router = useRouter();
	const pathname = usePathname();

	const boxRef = useRef<Mesh>(null);
	const boxMaterial = useRef<ShaderMaterial>(null);
	const cornerTl = useRef<gsap.core.Timeline>();
	const prevPathName = useRef(pathname);

	const defaultUCorners = useMemo(() => {
		return new Vector4(0, 0, 0, 0);
	}, []);

	const { height, width } = useThree((state) => state.size);
	const { planeWidth, totalOffset } = usePlaneDimension();

	const texture = useTexture(img);

	const {
		source: {
			data: { width: imgWidth, height: imgHeight },
		},
	} = texture;

	useEffect(() => {
		if (boxMaterial.current) {
			cornerTl.current = gsap
				.timeline()
				.to(boxMaterial.current.uniforms.uCorners.value, {
					x: 1,
					duration: 0.4,
				})
				.to(
					boxMaterial.current.uniforms.uCorners.value,
					{
						y: 1,
						duration: 0.4,
					},
					"0.1"
				)
				.to(
					boxMaterial.current.uniforms.uCorners.value,
					{
						z: 1,
						duration: 0.4,
					},
					"0.2"
				)
				.to(
					boxMaterial.current.uniforms.uCorners.value,
					{
						w: 1,
						duration: 0.4,
					},
					"0.3"
				);

			cornerTl.current.pause();
		}
	}, []);

	useFrame((_, delta) => {
		if (boxMaterial.current) {
			boxMaterial.current.uniforms.uTime.value += delta;
			boxMaterial.current.uniforms.uProgress.value =
				cornerTl.current?.progress() || 0;
		}
	});

	useEffect(() => {
		if (pathname === "/lab/page-transition" && prevPathName.current === url) {
			cornerTl.current?.reverse();
		}

		if (pathname === url && !cornerTl.current?.progress()) {
			cornerTl.current?.progress(1);
		}

		prevPathName.current = url;
	}, [pathname, url]);

	const onClick = async (evt: ThreeEvent<PointerEvent>) => {
		evt.stopPropagation();
		await cornerTl.current?.play();
		router.push(url);
	};

	const onHover = () => {
		router.prefetch(url);
	};

	return (
		<group
			name={id}
			onPointerUp={onClick}
			onPointerOver={onHover}
			position-x={totalOffset * index - totalOffset}
		>
			{/**preload the actual image Next is going to use on the next page */}
			<Html className="opacity-0 w-[100vw] h-[100vh] pointer-events-none">
				<Image
					src={img}
					alt={title}
					fill
				/>
			</Html>
			<mesh
				ref={boxRef}
				scale={[planeWidth, planeWidth, 1]}
				geometry={geometry}
			>
				<shaderMaterial
					key={`${id}_${Date.now().toString()}`}
					ref={boxMaterial}
					fragmentShader={fragmentShader}
					vertexShader={vertexShader}
					side={DoubleSide}
					uniforms={{
						uProgress: { value: 0 },
						uTime: {
							value: 0,
						},
						uTexture: {
							value: texture,
						},
						uResolution: { value: [width, height] },
						uPlaneSize: { value: [planeWidth, planeWidth] },
						uTextureSize: { value: [imgWidth, imgHeight] },
						uCorners: {
							value: defaultUCorners,
						},
					}}
				/>
			</mesh>
			<Text
				position-y={-(planeWidth + 24 * 2) / 2}
				position-x={-planeWidth / 2}
				color={"white"}
				font="/fonts/Inter-Medium.ttf"
				fontSize={24}
				anchorX={"left"}
			>
				{title}
			</Text>
		</group>
	);
}
