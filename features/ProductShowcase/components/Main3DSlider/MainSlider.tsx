import { Slide1 } from "./Slide1";
import { SlideBackground } from "./SlideBackground";
import { Slide2 } from "./Slide2";
import { Slide3 } from "./Slide3";
import { Vector3 } from "three";

const BackgroundScale = 2.2;
const BackgroundPosition = new Vector3(-3, 1, -4);

export default function MainSlider() {
	return (
		<>
			<SlideBackground
				backgroundPosition={BackgroundPosition}
				backgroundScale={BackgroundScale}
			/>

			<Slide1 slide={0} />
			<Slide2 slide={1} />
			<Slide3 slide={2} />
		</>
	);
}
