import React, {
	ElementRef,
	useCallback,
	useImperativeHandle,
	useRef,
} from "react";
import { DoubleSide, Points, Texture } from "three";
import vertexShader from "@/features/ExpodingParticles/shaders/vertex.glsl";
import fragmentShader from "@/features/ExpodingParticles//shaders/fragment.glsl";
import { Html } from "@react-three/drei";

type Props = {
	distortionRate: number;
	texture: Texture;
	videoSrc: string;
	onAnimationReady?: (isReady: boolean) => void;
};

export type ModelGroupRef = {
	video: ElementRef<"video"> | null;
	mesh: Points | null;
};

const Model = React.forwardRef<ModelGroupRef, Props>(
	({ distortionRate, texture, videoSrc, onAnimationReady }, ref) => {
		const meshRef = useRef<Points | null>(null);
		const videoRef = useRef<ElementRef<"video"> | null>(null);

		const onRefSetter = useCallback(() => {
			if (onAnimationReady && typeof onAnimationReady === "function") {
				onAnimationReady(!!meshRef.current && !!videoRef.current);
			}
		}, [onAnimationReady]);

		useImperativeHandle(ref, () => ({
			get video() {
				return videoRef.current;
			},
			get mesh() {
				return meshRef.current;
			},
		}));

		return (
			<group>
				<points
					ref={(ref) => {
						meshRef.current = ref;
						onRefSetter();
					}}
				>
					<planeGeometry
						args={[480 * 1.5, 820 * 1.5, 480 / 1.75, 820 / 1.75]}
					/>
					<shaderMaterial
						key={new Date().toISOString()}
						side={DoubleSide}
						uniforms={{
							uTStart: { value: texture },
							uTEnd: { value: texture },
							uTime: { value: 0 },
							uDistortionRate: { value: distortionRate },
							uProgress: {
								value: 0,
							},
						}}
						vertexShader={vertexShader}
						fragmentShader={fragmentShader}
					/>
				</points>
				<Html>
					<div className="-translate-y-1/2 -translate-x-1/2">
						<video
							className="max-w-[initial] w-[40vh] h-[58.6vh]"
							src={videoSrc}
							ref={(ref) => {
								videoRef.current = ref;
								onRefSetter();
							}}
							webkit-playsinline="true"
							muted
							playsInline
						/>
					</div>
				</Html>
			</group>
		);
	}
);

Model.displayName = "PointsExplodingModel";

export default Model;
