import { Cloud, Clouds, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { ElementRef, useMemo, useRef, useState } from "react";
import {
	BoxGeometry,
	BufferGeometry,
	Group,
	Mesh,
	MeshBasicMaterial,
} from "three";
import { Brush, Evaluator, SUBTRACTION } from "three-bvh-csg";
import Interface from "./Interface";

type Props = {
	children: React.ReactNode;
};

export default function Container({ children }: Props) {
	const ref = useRef<Group>(null);
	const cloudRef = useRef<ElementRef<typeof Clouds>>(null);

	const [evaluator] = useState(() => new Evaluator());

	const board = useMemo(() => {
		const boardFill = new Brush(new BoxGeometry(11, 2, 11));

		// boardFill.material.color.set("red");
		const boardHole = new Brush(new BoxGeometry(10, 2.1, 10));
		// boardHole.position.y = 0.2;
		// boardHole.updateMatrixWorld();

		const board = evaluator.evaluate(boardFill, boardHole, SUBTRACTION);
		board.geometry.clearGroups();

		return board;
	}, [evaluator]);

	const scrollData = useScroll();

	useFrame((_, delta) => {
		if (cloudRef.current) {
			const curve1 = scrollData.curve(0.2, 0.5);
			const curve3 = scrollData.curve(0.9, 0.2);

			cloudRef.current.rotation.y += delta * 0.1;

			(
				cloudRef.current.children[1] as Mesh<BufferGeometry, MeshBasicMaterial>
			).material.opacity = Math.max(curve1, curve3);
		}

		if (ref.current) {
			ref.current.rotation.y = scrollData.offset * 1.3;
		}
	});

	return (
		<group ref={ref}>
			{children}

			<Interface />

			<mesh
				{...board}
				castShadow
				receiveShadow
			>
				<meshStandardMaterial
					color={"#ffffff"}
					metalness={0}
					roughness={0.3}
				/>
			</mesh>

			<Clouds
				material={MeshBasicMaterial}
				position-y={4}
				ref={cloudRef}
			>
				<Cloud
					color={"#ffffff"}
					scale={0.5}
					seed={20}
					opacity={0.75}
					concentrate="random"
					bounds={[8, 0.25, 8]}
				/>
			</Clouds>
		</group>
	);
}
