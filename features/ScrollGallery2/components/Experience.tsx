import { Scroll, ScrollControls } from "@react-three/drei";
import Gallery from "./Gallery";
import TextGallery from "./TextGallery";

export default function Experience() {
	return (
		<ScrollControls
			pages={6}
			infinite
			horizontal
			damping={0.4}
		>
			<Scroll>
				<Gallery />
			</Scroll>
			<Scroll html>
				<TextGallery />
			</Scroll>
		</ScrollControls>
	);
}
