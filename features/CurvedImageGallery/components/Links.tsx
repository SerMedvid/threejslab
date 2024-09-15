import useStore from "../store/useStore";

type LinkProps = {
	id: string;
	name: string;
};
const Link = ({ id, name }: LinkProps) => {
	const setCurrentImage = useStore((state) => state.setCurrentImage);

	const onHover = () => {
		setCurrentImage(id);
	};

	return (
		<li
			className="text-4xl font-medium  hover:cursor-pointer py-4 border-b-2 border-black"
			key={id}
			onPointerEnter={onHover}
		>
			<h3 className="whitespace-nowrap truncate max-w-[60vw] md:max-w-[30vw] leading-relaxed uppercase">
				{name}
			</h3>
		</li>
	);
};

export default function Links() {
	const slides = useStore((state) => state.slides);
	const setCurrentImage = useStore((state) => state.setCurrentImage);

	const onLeave = () => {
		setCurrentImage(null);
	};

	return (
		<ul
			onPointerLeave={onLeave}
			className="px-4 my-32"
		>
			{slides.map((slide) => (
				<Link
					key={slide.id}
					id={slide.id}
					name={slide.name}
				/>
			))}
		</ul>
	);
}
