import { useMemo } from "react";
import {
	BoxGeometry,
	BufferGeometry,
	CatmullRomCurve3,
	Color,
	EdgesGeometry,
	Euler,
} from "three";
import Object from "./Object";

type Props = {
	count: number;
	motionPath: CatmullRomCurve3;
	baseGeometry?: BufferGeometry;
};

const boxRotation = new Euler();

export default function Objects({ count, motionPath, baseGeometry }: Props) {
	const boxGeometry = useMemo(() => {
		const geometry = baseGeometry || new BoxGeometry(0.075, 0.075, 0.075);
		return new EdgesGeometry(geometry, 0.25);
	}, [baseGeometry]);

	return Array.from({ length: count }).map((_, i) => {
		const p = (i / count + Math.random() * 0.1) % 1;
		const pos = motionPath.getPointAt(p);
		pos.x += Math.random() - 0.4;
		pos.z += Math.random() - 0.4;

		const rot = boxRotation
			.clone()
			.set(
				Math.random() * Math.PI,
				Math.random() * Math.PI,
				Math.random() * Math.PI
			);

		const color = new Color().setHSL(
			Math.random() * (1 - 0.1 + 1) + 0.1,
			1,
			0.5
		);

		return (
			<Object
				key={i}
				position={pos}
				rotation={rot}
				geometry={boxGeometry}
				color={color}
			/>
		);
	});
}
