import { useFrame, useThree } from "@react-three/fiber";
import { useCallback, useRef } from "react";
import { Mesh, Vector3 } from "three";

type Props = JSX.IntrinsicElements["group"] & {
	nodes: {
		Beam: Mesh;
	};
	material: React.ReactNode;
	delay?: number;
	diameter?: number;
};

import gsap from "gsap";

import { useInterval } from "ahooks";

export default function Beam({
	nodes,
	material,
	delay = 1500,
	diameter = 3,
	...rest
}: Props) {
	const beamRef = useRef<Mesh>(null);

	const scene = useThree((state) => state.scene);

	const fireDataRef = useRef({
		bulletDirection: new Vector3(0, 0, 0),
		bullet: new Mesh(),
		canFire: false,
	});

	const createShot = useCallback(async () => {
		if (beamRef.current) {
			fireDataRef.current.bullet.removeFromParent();
			fireDataRef.current.bullet = beamRef.current.clone();
			fireDataRef.current.canFire = false;

			scene.add(fireDataRef.current.bullet);
			beamRef.current.getWorldPosition(fireDataRef.current.bullet.position);
			beamRef.current.getWorldQuaternion(fireDataRef.current.bullet.quaternion);

			beamRef.current.getWorldDirection(fireDataRef.current.bulletDirection);

			await gsap.timeline().to(fireDataRef.current.bullet.scale, {
				x: diameter,
				y: diameter,
				z: 300 * diameter,
				duration: 0.1,
				onComplete: () => {
					fireDataRef.current.canFire = true;
				},
			});
		}
	}, [scene, diameter]);

	useFrame((_, delta) => {
		if (fireDataRef.current.canFire) {
			fireDataRef.current.bullet.translateZ(100 * delta);
		}
	});

	useInterval(createShot, delay);

	return (
		<group {...rest}>
			<mesh
				ref={beamRef}
				geometry={nodes.Beam.geometry}
			>
				{material}
			</mesh>
		</group>
	);
}
