import { HologramMaterialT } from "@/components/materials/Hologram";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { ElementRef, useMemo, useRef } from "react";
import { AdditiveBlending, Color, DoubleSide } from "three";

export default function Model() {
	const materialRef = useRef<HologramMaterialT>(null);

	const { color } = useControls({
		color: "#fff",
	});

	const material = useMemo(() => {
		return (
			<hologramMaterial
				ref={materialRef}
				key={Date.now()}
				transparent
				side={DoubleSide}
				depthWrite={false}
				blending={AdditiveBlending}
				uniforms={{
					time: {
						value: 0,
					},
					color: {
						value: new Color(color),
					},
				}}
			/>
		);
	}, [color]);

	useFrame((state, delta) => {
		const { elapsedTime } = state.clock;

		if (materialRef.current) {
			materialRef.current.time = elapsedTime;
		}
	});

	return (
		<>
			<mesh position-x={-3}>
				<boxGeometry />
				{material}
			</mesh>

			<mesh position-x={0}>
				<sphereGeometry />
				{material}
			</mesh>

			<mesh position-x={3}>
				<torusGeometry />
				{material}
			</mesh>
		</>
	);
}
