import React, {
	Dispatch,
	ElementRef,
	RefObject,
	SetStateAction,
	useCallback,
	useEffect,
	useImperativeHandle,
	useLayoutEffect,
	useRef,
} from "react";
import { DoubleSide, Points, Texture, Vector2, Vector4 } from "three";
import vertexShader from "@/features/ExpodingParticles/shaders/vertex.glsl";
import fragmentShader from "@/features/ExpodingParticles//shaders/fragment.glsl";
import { Html, useTexture } from "@react-three/drei";

type Props = {
	distortionRate: number;
	texture: Texture;
	onAnimationReady?: (isReady: boolean) => void;
};

export type ModelGroupRef = {
	video: ElementRef<"video"> | null;
	mesh: Points | null;
};

const Model = React.forwardRef<ModelGroupRef, Props>(
	({ distortionRate, texture, onAnimationReady }, ref) => {
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
					<planeGeometry args={[480 * 1.5, 820 * 1.5, 240, 410]} />
					<shaderMaterial
						key={new Date().toISOString()}
						side={DoubleSide}
						uniforms={{
							t: { value: texture },
							time: { value: 0 },
							resolution: { value: new Vector4() },
							distortionRate: { value: distortionRate },
							uvRate1: {
								value: new Vector2(1, 1),
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
							src={"/assets/ExplodingParticles/video-01.mp4"}
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
