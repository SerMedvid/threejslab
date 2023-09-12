import { useTexture } from "@react-three/drei";

import fragShader from "../shaders/fragment.glsl";
import vertexShader from "../shaders/vertex.glsl";
import React, {
	MutableRefObject,
	useCallback,
	useEffect,
	useMemo,
	useRef,
} from "react";
import {
	BufferAttribute,
	ShaderMaterial,
	Vector2,
	InstancedBufferAttribute,
	Mesh,
} from "three";
import { useFrame } from "@react-three/fiber";
import Trail from "./Trail";
import { gsap } from "gsap";

type Props = {
	src: string;
};

const DISCARD_THRESHOLD = 34;

const getImageData = (img: HTMLImageElement) => {
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d")!;

	canvas.width = img.width;
	canvas.height = img.height;
	ctx.scale(1, -1);

	ctx.drawImage(img, 0, 0, img.width, img.height * -1);

	const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

	const originalColors = Float32Array.from(imgData.data);

	return originalColors;
};

const getGeometryProperties = (image: HTMLImageElement) => {
	// plain geometry ref
	const positions = new BufferAttribute(new Float32Array(4 * 3), 3);
	positions.setXYZ(0, -0.5, 0.5, 0.0);
	positions.setXYZ(1, 0.5, 0.5, 0.0);
	positions.setXYZ(2, -0.5, -0.5, 0.0);
	positions.setXYZ(3, 0.5, -0.5, 0.0);

	// plain geometry ref
	const uvs = new BufferAttribute(new Float32Array(4 * 2), 2);
	uvs.setXY(0, 0.0, 0.0);
	uvs.setXY(1, 1.0, 0.0);
	uvs.setXY(2, 0.0, 1.0);
	uvs.setXY(3, 1.0, 1.0);

	// plain geometry ref
	const indexes = new Uint16Array([0, 2, 1, 2, 3, 1]);

	const originalColors = getImageData(image);
	const numPoints = image.height * image.width;
	let numVisible = 0;

	for (let i = 0; i < numPoints; i++) {
		if (originalColors[i * 4 + 0] > DISCARD_THRESHOLD) numVisible++;
	}

	const indices = new InstancedBufferAttribute(
		new Uint16Array(numVisible),
		1,
		false
	);
	const offsets = new InstancedBufferAttribute(
		new Float32Array(numVisible * 3),
		3,
		false
	);
	const angles = new InstancedBufferAttribute(
		new Float32Array(numVisible),
		1,
		false
	);

	for (let i = 0, j = 0; i < numPoints; i++) {
		if (originalColors[i * 4 + 0] <= DISCARD_THRESHOLD) continue;

		offsets.setXYZ(j, i % image.width, Math.floor(i / image.width), 0);

		indices.setX(j, i);

		angles.setX(j, Math.random() * Math.PI);

		j++;
	}

	return {
		positions,
		uvs,
		indexes,
		indices,
		offsets,
		angles,
	};
};

const Model = React.forwardRef<Mesh, Props>(({ src }, ref) => {
	const { texture } = useTexture({ texture: src });
	const fallbackRef = useRef<Mesh>(null);
	const pointsRef = (ref as MutableRefObject<Mesh>) || fallbackRef;

	const { image } = texture;

	const { positions, uvs, indexes, indices, offsets, angles } = useMemo(
		() => getGeometryProperties(image),
		[image]
	);

	useFrame((state) => {
		const { elapsedTime } = state.clock;

		const { camera, size } = state;

		camera.position.z = Math.max(
			250,
			(image.width * 1.5) / (size.width / image.width)
		);

		if (pointsRef.current?.material instanceof ShaderMaterial) {
			pointsRef.current.material.uniforms.uTime.value = elapsedTime;
		}
	});

	const buildEnterAnimation = useCallback(() => {
		if (image && pointsRef.current?.material instanceof ShaderMaterial) {
			const uniforms = pointsRef.current.material.uniforms;

			const timeline = gsap
				.timeline()
				.add(
					gsap.to(uniforms.uRandom, {
						value: 2,
						duration: 1,
					}),
					"showStart"
				)
				.add(
					gsap.fromTo(
						uniforms.uDepth,
						{
							value: 40,
							duration: 1,
						},
						{
							value: 4,
						}
					),
					"showStart"
				)
				.add(
					gsap.fromTo(
						uniforms.uSize,
						{
							value: 0.5,
							duration: 1,
						},
						{ value: 1.5 }
					),
					"showStart"
				);

			return () => {
				timeline.kill();
			};
		}
	}, [image, pointsRef]);

	useEffect(() => {
		buildEnterAnimation();
	}, [buildEnterAnimation]);

	if (!image) return null;

	return (
		<>
			<mesh
				ref={pointsRef}
				key={src}
			>
				<shaderMaterial
					key={Date.now().toLocaleString()}
					vertexShader={vertexShader}
					fragmentShader={fragShader}
					uniforms={{
						uTexture: { value: texture },
						uTime: { value: 0 },
						uTextureSize: { value: new Vector2(image.width, image.height) },
						uRandom: { value: 5.0 },
						uDepth: { value: 4 },
						uSize: { value: 1.5 },
						uTouch: { value: null },
					}}
					transparent
					depthTest={false}
				/>
				<instancedBufferGeometry
					attributes={{
						position: positions,
						uv: uvs,
						offset: offsets,
						pindex: indices,
						angle: angles,
					}}
					instanceCount={offsets.count}
					index={new BufferAttribute(indexes, 1)}
				/>
			</mesh>
			<Trail
				height={image.height}
				width={image.width}
				particlesRef={pointsRef}
			/>
		</>
	);
});

Model.displayName = "Points Model";

export default Model;
