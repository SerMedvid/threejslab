import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { ReactNode, useMemo, useRef } from "react";
import { Group } from "three";

type Props = {
	children: ReactNode;
};

export default function GroupControl({ children }: Props) {
	const scroll = useScroll();
	const groupRef = useRef<Group>(null);
	const cummulativeRotation = useRef(0);

	const animationHandler = useMemo(() => {
		return [
			(progress: number) => {
				cummulativeRotation.current;

				if (groupRef.current)
					groupRef.current.rotation.y = -(Math.PI / 2) * progress;
			},
			(progress: number) => {
				if (groupRef.current) {
					groupRef.current.rotation.y = -(Math.PI / 2) * (1 - progress);
					groupRef.current.position.y = Math.sin(progress * 10) * 0.1;
				}
			},
			(progress: number) => {
				if (groupRef.current) {
					groupRef.current.rotation.y = -(Math.PI / 1.5) * progress;
				}
			},
			(progress: number) => {
				if (groupRef.current) {
					groupRef.current.rotation.y = -(Math.PI / 1.5) * (1 - progress);
				}
			},
		];
	}, []);

	useFrame(({ camera }) => {
		const { offset, pages } = scroll;
		const clampPages = pages / 2;

		const animationProgress = (offset * pages) % 2;
		const particlesProgress = Math.min(1, animationProgress);
		const index = Math.min(Math.floor(offset * clampPages), clampPages - 1);
		animationHandler[index](particlesProgress);
	});

	return <group ref={groupRef}>{children}</group>;
}
