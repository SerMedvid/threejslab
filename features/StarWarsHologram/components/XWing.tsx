import { Mesh } from "three";
import Beam from "./Beam";
import useFollowPath from "../hooks/useFollowPath";

type Props = JSX.IntrinsicElements["group"] & {
	nodes: {
		XWing: Mesh;
		XWingBeam: Mesh;
	};
	material: React.ReactNode;
	beamMaterial: React.ReactNode;
	knot?: JSX.IntrinsicElements["mesh"];
};

export default function XWing({
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
				ref={groupRef}
				{...rest}
			>
				<mesh
					geometry={nodes.XWing.geometry}
					ref={aircraftRef}
				>
					{material}

					<Beam
						position={[-1.94, -0.682, 1.914]}
						nodes={{ Beam: nodes.XWingBeam }}
						material={beamMaterial}
						delay={1300}
					/>

					<Beam
						position={[1.94, 0.682, 1.914]}
						nodes={{ Beam: nodes.XWingBeam }}
						material={beamMaterial}
						delay={1300}
					/>

					<Beam
						position={[1.94, -0.682, 1.914]}
						nodes={{ Beam: nodes.XWingBeam }}
						material={beamMaterial}
					/>

					<Beam
						position={[-1.94, 0.682, 1.914]}
						nodes={{ Beam: nodes.XWingBeam }}
						material={beamMaterial}
						delay={1200}
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
					color={"yellow"}
				/>
			</mesh>
		</>
	);
}
