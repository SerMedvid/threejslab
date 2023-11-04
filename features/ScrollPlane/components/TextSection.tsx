import { Text } from "@react-three/drei";
import { fadeOnBeforeCompileFlat } from "../utils/fadeMaterial";

type Props = {
	title?: string;
	subtitle: string;
} & JSX.IntrinsicElements["group"];

export default function TextSection({ title, subtitle, ...rest }: Props) {
	return (
		<>
			<group {...rest}>
				{!!title && (
					<Text
						color={"white"}
						anchorX={"left"}
						anchorY={"bottom"}
						lineHeight={1}
						fontSize={0.52}
						maxWidth={2.5}
						font="/fonts/DMSerifDisplay-Regular.ttf"
					>
						<meshStandardMaterial
							color={"white"}
							onBeforeCompile={fadeOnBeforeCompileFlat}
						/>
						{title}
					</Text>
				)}

				<Text
					color={"white"}
					anchorX={"left"}
					anchorY={"top"}
					fontSize={0.22}
					maxWidth={2.5}
					font="/fonts/Inter-Regular.ttf"
				>
					<meshStandardMaterial
						color={"white"}
						onBeforeCompile={fadeOnBeforeCompileFlat}
					/>
					{subtitle}
				</Text>
			</group>
		</>
	);
}
