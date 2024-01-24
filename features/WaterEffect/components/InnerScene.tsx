import { useThree } from "@react-three/fiber";
import ImageTile from "./ImageTile";
import { Text } from "@react-three/drei";

export default function InnerScene() {
	const { height, width } = useThree((state) => state.viewport);

	return (
		<group>
			<ImageTile
				scale={[width * 0.3, height * 0.9]}
				position-x={-width / 3}
				url="/assets/FurnitureGallery/7.jpg"
			/>
			<Text
				anchorX={"center"}
				position={[0, 0, 0]}
				font="/fonts/Inter-Medium.ttf"
				letterSpacing={-0.1}
				color="white"
			>
				LOOK
			</Text>
			<ImageTile
				scale={[width * 0.3, height * 0.9]}
				url="/assets/FurnitureGallery/8.jpg"
			/>

			<ImageTile
				scale={[width * 0.3, height * 0.9]}
				position-x={width / 3}
				url="/assets/FurnitureGallery/3.jpg"
			/>
		</group>
	);
}
