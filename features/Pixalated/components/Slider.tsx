import Slide from "./Slide";
import useStore from "../store/useStore";

export default function Slider() {
	const slides = useStore((state) => state.slides);

	return slides.map(({ id, img, prompt }, index) => (
		<Slide
			key={id}
			img={img}
			prompt={prompt}
			index={index}
		/>
	));
}
