import { Text } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export default function Typography() {
	const viewport = useThree((state) => state.viewport);
	const camera = useThree((state) => state.camera);
	const { width, height } = viewport.getCurrentViewport(camera, [0, 0, 12]);
	const commonProps = {
		font: "/fonts/Inter-Regular.ttf",
		letterSpacing: -0.1,
		color: "black",
	};

	return (
		<>
			<Text
				anchorX={"left"}
				position={[-width / 2.5, -height / 10, 12]}
				{...commonProps}
			>
				to
			</Text>
			<Text
				anchorX={"right"}
				position={[width / 2.5, -height * 2, 12]}
				{...commonProps}
			>
				be
			</Text>
			<Text
				position={[0, -height * 4.624, 12]}
				{...commonProps}
			>
				home
			</Text>
		</>
	);
}
