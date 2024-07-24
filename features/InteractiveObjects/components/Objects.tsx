import { useFrame } from "@react-three/fiber";
import {
	RapierRigidBody,
	vec3,
	InstancedRigidBodies,
	InstancedRigidBodyProps,
} from "@react-three/rapier";
import { easing } from "maath";
import { useMemo, useRef, useState } from "react";
import {
	Color,
	IcosahedronGeometry,
	InstancedBufferAttribute,
	InstancedMesh,
	MeshStandardMaterial,
	Vector3,
} from "three";

type Props = {
	count: number;
	gravityCenter?: Vector3;
	range?: number;
};

const sceneCenter = new Vector3(0, 0, 0);
const CLOSE_COLOR = new Color("#008bf5");
const FAR_COLOR = new Color("#d9bc04");

export default function Objects({
	count,
	range = 20,
	gravityCenter = sceneCenter,
}: Props) {
	const baseColor = new Color();
	const [geometry] = useState(() => new IcosahedronGeometry(0.5, 1));

	const [material] = useState(
		() =>
			new MeshStandardMaterial({
				flatShading: true,
			})
	);

	const instances = useMemo(() => {
		const instances: InstancedRigidBodyProps[] = [];

		for (let i = 0; i < count; i++) {
			instances.push({
				key: "instance_" + Math.random(),
				position: [
					Math.random() * range - range / 2,
					Math.random() * range - range / 2,
					Math.random() * range - range / 2,
				],
			});
		}

		return instances;
	}, [count, range]);

	const ridgidBodies = useRef<RapierRigidBody[]>([]);
	const instancedMeshes = useRef<InstancedMesh>(null);

	useFrame((_, delta) => {
		if (ridgidBodies.current) {
			ridgidBodies.current.forEach((body, idx) => {
				body.resetForces(true);

				const pos = vec3(body.translation());

				if (instancedMeshes.current && instancedMeshes.current.instanceColor) {
					const currentColor = baseColor.clone();
					instancedMeshes.current.getColorAt(idx, currentColor);

					const distanceToPlayer = pos.distanceTo(gravityCenter);
					const finalColor = distanceToPlayer > 5 ? CLOSE_COLOR : FAR_COLOR;

					easing.dampC(currentColor, finalColor, 0.1, delta);

					instancedMeshes.current.setColorAt(idx, currentColor);
					instancedMeshes.current.instanceColor.needsUpdate = true;
				}

				const direction = pos.sub(gravityCenter).normalize();

				body.addForce(direction.multiplyScalar(-1.5), true);
			});
		}
	});

	return (
		<>
			<InstancedRigidBodies
				ref={ridgidBodies}
				instances={instances}
				density={0.3}
				restitution={0.2}
				angularVelocity={[0.1, 0.1, 0.1]}
				angularDamping={0.05}
				linearDamping={0.05}
				colliders="ball"
				type={"dynamic"}
			>
				<instancedMesh
					ref={instancedMeshes}
					instanceColor={
						new InstancedBufferAttribute(new Float32Array(count * 3), 3)
					}
					args={[geometry, material, count]}
				/>
			</InstancedRigidBodies>
		</>
	);
}
