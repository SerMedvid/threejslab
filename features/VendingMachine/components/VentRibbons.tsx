import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { DoubleSide, Mesh, MeshStandardMaterial, RepeatWrapping } from "three";

type Props = JSX.IntrinsicElements["group"] & {
	nodes: {
		Plane003: Mesh;
	};
	materials: {
		VM_Baked: MeshStandardMaterial;
	};
	seed?: number;
};

export default function VentRibbon({
	nodes,
	materials,
	seed = 1,
	...rest
}: Props) {
	const waveTexture = useTexture("/assets/VendingMachine/wave.jpg", (tex) => {
		tex.wrapS = RepeatWrapping;
		tex.wrapT = RepeatWrapping;

		tex.offset.set(0, 0);
		tex.repeat.set(10, 10);
	});

	const materialRef = useRef<MeshStandardMaterial>(null);

	useFrame((_, delta) => {
		if (materialRef.current?.displacementMap) {
			materialRef.current.displacementMap.offset.x += delta * 0.1 * seed;
		}
	});

	return (
		<group {...rest}>
			<mesh
				scale={[0.764, 0.0583, 1]}
				geometry={nodes.Plane003.geometry}
			>
				<meshStandardMaterial
					side={DoubleSide}
					ref={materialRef}
					displacementMap={waveTexture}
					displacementScale={0.2}
					color={"#ab841a"}
				/>
			</mesh>
		</group>
	);
}

useTexture.preload("/assets/VendingMachine/wave.jpg");
