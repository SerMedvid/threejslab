import { useTexture } from "@react-three/drei";
import { PlaneGeometry } from "three";

const plane = new PlaneGeometry(0.8, 0.5);

type Props = {
	opacity?: number;
};

export default function FakeShadow({ opacity = 0.1 }: Props) {
	const textture = useTexture("/assets/SkateboardConfigurator/roundshadow.png");

	return (
		<mesh
			rotation-x={-Math.PI / 2.1}
			position-y={-2.2}
			geometry={plane}
			name="FakeShadow"
		>
			<meshBasicMaterial
				map={textture}
				transparent
				opacity={opacity}
			/>
		</mesh>
	);
}
