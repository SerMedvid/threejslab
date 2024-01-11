const text = ["home", "to", "be"];
const textItems = [...text, ...text, ...text];

export default function TextGallery() {
	return textItems.map((item, idx) => (
		<h1
			key={idx}
			style={{ left: `${-25 + idx * 83.35}vw` }}
			className={`absolute top-[20vh] text-[15vw] `}
		>
			{item}
		</h1>
	));
}
