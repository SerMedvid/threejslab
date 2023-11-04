import { Environment, Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { LayerMaterial, Gradient } from "lamina";
import { memo, useRef } from "react";
import { BackSide, Color } from "three";

const START = 0.2;
const END = -0.5;

type Props = {
	backgroundColors: React.RefObject<{ colorA: string; colorB: string }>;
};

export const Background = ({ backgroundColors }: Props) => {
	const gradientRef = useRef<any>(null);
	const gradientEnvRef = useRef<any>(null);

	useFrame(() => {
		if (gradientRef.current && gradientEnvRef.current) {
			gradientRef.current.colorA = new Color(backgroundColors.current?.colorA);
			gradientRef.current.colorB = new Color(backgroundColors.current?.colorB);
			gradientEnvRef.current.colorA = new Color(
				backgroundColors.current?.colorA
			);
			gradientEnvRef.current.colorB = new Color(
				backgroundColors.current?.colorB
			);
		}
	});

	return (
		<>
			<Sphere
				scale={[500, 500, 500]}
				rotation-y={Math.PI / 2}
			>
				<LayerMaterial
					color={"#ffffff"}
					side={BackSide}
				>
					<Gradient
						ref={gradientRef}
						axes="y"
						start={START}
						end={END}
					/>
				</LayerMaterial>
			</Sphere>

			<Environment
				resolution={256}
				frames={Infinity}
			>
				<Sphere
					scale={[100, 100, 100]}
					rotation-y={Math.PI / 2}
					rotation-x={Math.PI}
				>
					<LayerMaterial
						side={BackSide}
						color={"#ffffff"}
					>
						<Gradient
							ref={gradientEnvRef}
							axes="y"
							start={START}
							end={END}
						/>
					</LayerMaterial>
				</Sphere>
			</Environment>
		</>
	);
};

export default memo(Background);
