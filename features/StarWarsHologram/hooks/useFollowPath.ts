import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Group, Mesh, Vector3 } from "three";
import { KnotCurve } from "three/examples/jsm/curves/CurveExtras.js";

const CURVE_AHEAD = 0.02;

export default function useFollowPath() {
	const groupRef = useRef<Group>(null);
	const aircraftRef = useRef<Mesh>(null);
	const curveRef = useRef<Mesh>(null);
	const currentPointRef = useRef(new Vector3());

	const [flightDelay] = useState(() => (Math.random() - 0.5) * 2);

	const [curve] = useState(() => new KnotCurve());

	useFrame((state, delta) => {
		const elapsedTime = state.clock.elapsedTime;

		if (groupRef.current && curveRef.current) {
			const offset = (elapsedTime * 0.08 - flightDelay) % 1;

			curve.getPoint(offset + CURVE_AHEAD, currentPointRef.current);

			currentPointRef.current.multiply(curveRef.current.scale);
			currentPointRef.current.applyEuler(curveRef.current.rotation);
			currentPointRef.current.add(curveRef.current.position);

			groupRef.current.position.lerp(currentPointRef.current, delta * 24);

			groupRef.current.lookAt(currentPointRef.current);
		}
	});

	return {
		curve,
		aircraftRef,
		groupRef,
		curveRef,
	};
}
