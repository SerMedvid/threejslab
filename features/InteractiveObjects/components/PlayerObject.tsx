import { useFrame } from "@react-three/fiber";
import { BallCollider, RapierRigidBody, RigidBody } from "@react-three/rapier";
import { easing } from "maath";
import { forwardRef, RefObject, useRef } from "react";
import { Vector3 } from "three";

const PlayerObject = forwardRef<RapierRigidBody, {}>((_, outerRef) => {
	const innerRef = useRef<RapierRigidBody>(null);
	const ref = (outerRef ?? innerRef) as RefObject<RapierRigidBody>;
	const cursor = new Vector3();
	const dir = new Vector3();
	const targetPosition = new Vector3();

	useFrame(({ pointer, camera }, delta) => {
		cursor.set(pointer.x, pointer.y, 0.5).unproject(camera);
		dir.copy(cursor).sub(camera.position).normalize();

		cursor.add(dir.multiplyScalar(camera.position.length()));

		if (ref.current) {
			easing.damp3(targetPosition, cursor, 0.1, delta);

			ref.current.setTranslation({ ...targetPosition }, true);
		}
	});

	return (
		<RigidBody
			colliders={false}
			type="kinematicPosition"
			ref={ref}
		>
			<mesh>
				<icosahedronGeometry args={[0.25, 8]} />
				<meshStandardMaterial
					color={0xffffff}
					emissive={0xffffff}
				/>

				<pointLight
					intensity={50}
					position={[0, 0, 0]}
				/>
			</mesh>

			<BallCollider args={[0.75]} />
		</RigidBody>
	);
});

PlayerObject.displayName = "PlayerObject";

export default PlayerObject;
