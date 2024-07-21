import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import { LineSegments } from "three";

type Props = JSX.IntrinsicElements["lineSegments"] & {
	color: JSX.IntrinsicElements["lineBasicMaterial"]["color"];
};

export default function Object({ color, ...props }: Props) {
	const ref = useRef<LineSegments>(null);

	useFrame(() => {
		if (ref.current) {
			ref.current.rotation.y += 0.01;
		}
	});

	return (
		<lineSegments
			ref={ref}
			{...props}
		>
			<lineBasicMaterial color={color} />
		</lineSegments>
	);
}
