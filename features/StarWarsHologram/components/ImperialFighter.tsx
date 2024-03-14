import { Mesh } from "three";
import Beam from "./Beam";
import useFollowPath from "../hooks/useFollowPath";

type Props = JSX.IntrinsicElements["group"] & {
	nodes: {
		ImperialFighter: Mesh;
		ImperialFighterBeam: Mesh;
	};
	material: React.ReactNode;
	beamMaterial: React.ReactNode;
	knot?: JSX.IntrinsicElements["mesh"];
};

export default function ImperialFighter({
	nodes,
	material,
	beamMaterial,
	knot,
	...rest
}: Props) {
	const { groupRef, aircraftRef, curveRef, curve } = useFollowPath();

	return (
		<>
			<group
				{...rest}
				ref={groupRef}
			>
				<mesh
					geometry={nodes.ImperialFighter.geometry}
					ref={aircraftRef}
				>
					{material}

					<Beam
						nodes={{ Beam: nodes.ImperialFighterBeam }}
						position={[-0.007, -0.672, 1.084]}
						material={beamMaterial}
						diameter={2}
					/>
				</mesh>
			</group>

			<mesh
				{...knot}
				ref={curveRef}
				scale={0.75}
			>
				<tubeGeometry args={[curve, 50, 0.5, 2, true]} />
				<lineBasicMaterial
					transparent
					opacity={0}
					color={0x0000ff}
				/>
			</mesh>
		</>
	);
}
