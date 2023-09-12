import { ThreeEvent, useFrame } from "@react-three/fiber";
import React, { RefObject, useEffect, useRef } from "react";
import { Mesh, ShaderMaterial, Texture } from "three";

type Props = {
	height: number;
	width: number;
	particlesRef?: RefObject<Mesh> | null;
};

type TrailPoint = {
	x: number;
	y: number;
	age: number;
	force: number;
};

const MAX_POINT_AGE = 120;

/** draw canvas dimentions */
const SIZE = 64;
const POINT_RADIUS = 0.15;

const easeOutSine = (t: number, b: number, c: number, d: number) => {
	return c * Math.sin((t / d) * (Math.PI / 2)) + b;
};

export default function Trail({ height, width, particlesRef }: Props) {
	const trailRef = useRef<TrailPoint[]>([]);
	const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);
	const textureRef = useRef<Texture | null>(null);

	useEffect(() => {
		if (
			particlesRef?.current &&
			particlesRef.current.material instanceof ShaderMaterial
		) {
			const canvas = document.createElement("canvas");
			canvas.width = SIZE;
			canvas.height = SIZE;

			canvasCtxRef.current = canvas.getContext("2d")!;
			canvasCtxRef.current.fillStyle = "black";
			canvasCtxRef.current.fillRect(0, 0, SIZE, SIZE);

			textureRef.current = new Texture(canvas);

			canvas.style.width = `${SIZE}px`;
			canvas.style.height = `${SIZE}px`;
		}
	}, [height, width, particlesRef]);

	const onPointerMove = (evt: ThreeEvent<PointerEvent>) => {
		const { uv } = evt;

		if (!uv) return;

		let force = 0;

		const lastPoint = trailRef.current[trailRef.current.length - 1];

		if (lastPoint) {
			const dx = lastPoint.x - uv.x;
			const dy = lastPoint.y - uv.y;
			const dd = dx ** 2 + dy ** 2;
			force = Math.min(dd * 10000, 1);
		}

		trailRef.current.push({
			x: uv.x,
			y: uv.y,
			age: 0,
			force,
		});
	};

	const drawPoint = (point: TrailPoint) => {
		if (!canvasCtxRef.current) return;

		const pos = {
			x: point.x * SIZE,
			y: (1 - point.y) * SIZE,
		};

		let intensity = 1;

		if (point.age < MAX_POINT_AGE * 0.3) {
			intensity = easeOutSine(point.age / (MAX_POINT_AGE * 0.3), 0, 1, 1);
		} else {
			intensity = easeOutSine(
				1 - (point.age - MAX_POINT_AGE * 0.3) / (MAX_POINT_AGE * 0.7),
				0,
				1,
				1
			);
		}

		intensity *= point.force;

		const radius = SIZE * POINT_RADIUS * intensity;
		const grd = canvasCtxRef.current.createRadialGradient(
			pos.x,
			pos.y,
			radius * 0.25,
			pos.x,
			pos.y,
			radius
		);
		grd.addColorStop(0, `rgba(255, 255, 255, 0.2)`);
		grd.addColorStop(1, "rgba(0, 0, 0, 0.0)");

		canvasCtxRef.current.beginPath();
		canvasCtxRef.current.fillStyle = grd;
		canvasCtxRef.current.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
		canvasCtxRef.current.fill();
	};

	const clearCanvas = () => {
		if (canvasCtxRef.current) {
			canvasCtxRef.current.fillStyle = "black";
			canvasCtxRef.current.fillRect(0, 0, width, height);
		}
	};

	useFrame(() => {
		clearCanvas();

		if (!trailRef.current.length) return;

		trailRef.current.forEach((point, idx) => {
			point.age++;

			/** remove old points */
			if (point.age > MAX_POINT_AGE) trailRef.current.splice(idx, 1);
		});

		trailRef.current.forEach((point) => {
			drawPoint(point);
		});

		if (
			textureRef.current &&
			particlesRef?.current &&
			particlesRef.current.material instanceof ShaderMaterial
		) {
			textureRef.current.needsUpdate = true;
			particlesRef.current.material.uniforms.uTouch.value = textureRef.current;
		}
	});

	return (
		<>
			<mesh onPointerMove={onPointerMove}>
				<planeGeometry args={[width, height, 1, 1]} />
				<meshBasicMaterial
					color={"#FFFFFF"}
					wireframe
					depthTest={false}
					visible={false}
				/>
			</mesh>
		</>
	);
}
