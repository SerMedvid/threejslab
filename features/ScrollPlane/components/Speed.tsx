import { Instance, Instances, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import {
	AdditiveBlending,
	DoubleSide,
	MathUtils,
	Mesh,
	MeshBasicMaterial,
} from "three";

const INSRANCES = 240;
const MAX_OPACITY = 0.1;

const SpeedShape = () => {
	const ref = useRef<Mesh>();
	let randomPosition = {
		x: 0,
		y: 0,
		z: 0,
	};

	let randomSpeed = 0;

	const resetRandom = () => {
		randomPosition = {
			x: MathUtils.randFloatSpread(8),
			y: MathUtils.randFloatSpread(5),
			z: MathUtils.randFloatSpread(8),
		};

		randomSpeed = MathUtils.randFloat(16, 20);
	};

	resetRandom();

	useFrame((_, delta) => {
		if (ref.current) {
			ref.current.position.z += randomSpeed * delta;

			if (ref.current.position.z > 5) {
				resetRandom();
				ref.current.position.z = randomPosition.z;
			}
		}
	});

	return (
		<Instance
			ref={ref}
			color={"white"}
			position={[randomPosition.x, randomPosition.y, randomPosition.z]}
			rotation-y={Math.PI / 2}
		/>
	);
};

export default function Speed() {
	const speedMaterial = useRef<MeshBasicMaterial>(null);
	const scroll = useScroll();
	const lastScroll = useRef(0);

	useFrame((_, delta) => {
		if (speedMaterial.current) {
			if (scroll.offset - lastScroll.current > 0.0005) {
				speedMaterial.current.opacity = MAX_OPACITY;
			}

			lastScroll.current = scroll.offset;

			if (speedMaterial.current.opacity > 0) {
				speedMaterial.current.opacity -= delta * 0.2;
			}
		}
	});

	return (
		<group>
			<Instances>
				<planeGeometry args={[1, 0.004]} />
				<meshBasicMaterial
					ref={speedMaterial}
					side={DoubleSide}
					blending={AdditiveBlending}
					opacity={0}
					transparent
				/>
				{Array(INSRANCES)
					.fill(null)
					.map((_, key) => (
						<SpeedShape key={key} />
					))}
			</Instances>
		</group>
	);
}
