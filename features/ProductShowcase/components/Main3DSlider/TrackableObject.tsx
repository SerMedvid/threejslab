import { useFrame } from "@react-three/fiber";
import useMotionPath from "../../hooks/useMotionPath";
import {
	BufferGeometry,
	FrontSide,
	Group,
	Mesh,
	MeshStandardMaterial,
	Vector3,
} from "three";
import React, {
	Children,
	cloneElement,
	useEffect,
	useLayoutEffect,
	useRef,
} from "react";
import gsap from "gsap";
import { Line, Shadow } from "@react-three/drei";
import CustomEase from "gsap/CustomEase";
import useStore from "../../stores/useStore";

gsap.registerPlugin(CustomEase);

type Props = JSX.IntrinsicElements["group"] & {
	children: React.ReactNode;
	offset: number;
	motionPathScale: number;
	slide: number;
	debug?: boolean;
	shadow?: React.ReactNode;
};

export default function TrackableObject({
	children,
	offset,
	motionPathScale,
	slide,
	debug,
	shadow,
	...rest
}: Props) {
	const motionPath = useMotionPath({ scale: motionPathScale, slide });
	const ref = useRef<Group>(null);
	const progressRef = useRef(0);
	const currentPos = useRef(new Vector3());
	const meshRef = useRef<Mesh<BufferGeometry, MeshStandardMaterial>>(null);
	const animationRef = useRef<gsap.core.Timeline>();

	const isVisible = useStore((state) => state.slide === slide);

	useLayoutEffect(() => {
		if (meshRef.current) {
			meshRef.current.material.transparent = true;
			meshRef.current.material.side = FrontSide;
			meshRef.current.material.opacity = 0;
		}
	}, []);

	useEffect(() => {
		if (!meshRef.current) return;

		if (isVisible) {
			animationRef.current = gsap
				.timeline({})
				.set(ref.current, { visible: true })
				.fromTo(
					progressRef,
					{
						current: 0.1,
					},
					{
						current: 0.27,
						duration: 1,
						ease: "power2.in",
					}
				)
				.fromTo(
					meshRef.current.material,
					{ opacity: 0 },
					{ opacity: 1, duration: 0.8 },
					"<"
				)
				.to(
					progressRef,

					{
						current: 0.33,
						duration: 1.5,
						ease: "linear",
					}
				);
		} else {
			animationRef.current = gsap
				.timeline()

				.to(progressRef, {
					current: 0.67,
					duration: 1,
					ease: "power2.in",

					onComplete: () => {
						gsap.set(progressRef, { current: 0 });
						gsap.set(ref.current, { visible: false });

						if (meshRef.current) {
							gsap.set(meshRef.current.material, { opacity: 0 });
						}
					},
				})
				.to(
					meshRef.current.material,
					{
						opacity: 0,
						delay: 0.5,
						duration: 1,
					},
					"<"
				);
		}

		return () => {
			animationRef.current?.kill();
		};
	}, [isVisible]);

	useFrame(() => {
		if (
			progressRef.current > 0 &&
			motionPath &&
			ref.current &&
			meshRef.current
		) {
			const t =
				progressRef.current - offset < 0 ? 0 : progressRef.current - offset;

			motionPath.getPointAt(t, currentPos.current);
			currentPos.current.setZ(ref.current.position.z);
			ref.current.position.copy(currentPos.current);
		}
	});

	return (
		<>
			<group
				ref={ref}
				{...rest}
			>
				{Children.map(children, (child) => {
					return cloneElement(child as React.ReactElement, {
						ref: meshRef,
					});
				})}
				{shadow}
			</group>

			{motionPath && debug && (
				<Line
					points={motionPath.getPoints(40)}
					color={"red"}
				/>
			)}
		</>
	);
}
