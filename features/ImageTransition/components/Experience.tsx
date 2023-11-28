import Model from "./Model";

export default function Experience() {
	return (
		<>
			<Model
				position-x={-1.5}
				imgStart="/assets/ImageTransition/portrait.jpg"
				imgEnd="/assets/ImageTransition/full_body.jpg"
				imgDisplacement="/assets/ImageTransition/displacement/11.jpg"
			/>

			<Model
				position={[1.5, 0, -2]}
				imgStart="/assets/ImageTransition/portrait2.jpg"
				imgEnd="/assets/ImageTransition/full_body2.jpg"
				imgDisplacement="/assets/ImageTransition/displacement/19.jpg"
			/>
		</>
	);
}
