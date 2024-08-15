import { useEffect, useLayoutEffect, useRef } from "react";
import useStore from "../../stores/useStore";
import gsap from "gsap";

type Props = {
	slide: number;
	children: React.ReactNode;
};

export default function Column({ slide, children }: Props) {
	const ref = useRef<HTMLUListElement>(null);
	const hasRun = useRef(false);

	useEffect(() => {
		const unsubscribe = useStore.subscribe(
			(state) => ({
				currentSlide: state.slide,
				totalSlides: state.totalSlides,
				interacted: state.interacted,
			}),
			({ currentSlide, totalSlides, interacted }) => {
				if (interacted) {
					gsap
						.timeline()
						.to(ref.current, {
							xPercent:
								-100 * currentSlide +
								(Math.abs(currentSlide - slide) === totalSlides - 1
									? Math.sign(currentSlide - slide) * 100 * totalSlides
									: 0),
							ease: "linear",
						})
						.set(ref.current, {
							xPercent:
								currentSlide * -100 +
								(slide < currentSlide ? totalSlides * 100 : 0),
						});
				}
			}
		);

		return () => {
			unsubscribe();
		};
	}, [slide]);

	return (
		<ul
			className="w-full flex flex-col relative left-0"
			ref={ref}
		>
			{children}
		</ul>
	);
}
