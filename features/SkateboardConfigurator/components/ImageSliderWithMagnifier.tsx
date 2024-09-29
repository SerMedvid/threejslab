import React, {
	ElementRef,
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
	forwardRef,
	ForwardedRef,
} from "react";
import useStore from "../stores/useStore";
import gsap from "gsap";
import { Details } from "../data";
import Image from "next/image";

type Props = {
	items: Details[];
	currentFocused: Details;
	offsetDistance: number;
	width?: number;
	aspectRatio?: number;
	gap?: number;
	itemsPerView?: number;
};

const ImageSliderWithMagnifier = forwardRef(
	(
		{
			items,
			currentFocused,
			offsetDistance,
			width = 120,
			aspectRatio = 1,
			gap = 40,
			itemsPerView = 5,
		}: Props,
		ref: ForwardedRef<HTMLDivElement>
	) => {
		const isSwiping = useStore((store) => store.isSwiping);
		const generalDirection = useStore((store) => store.generalDirection);
		const mainSliderRef = useRef<ElementRef<"div">>(null);
		const magnifierSliderRef = useRef<ElementRef<"div">>(null);
		const [currentIndex, setCurrentIndex] = useState(
			items.findIndex((item) => item.id === currentFocused.id)
		);
		const totalItems = items.length;
		const magnifierMultiplier = 1.4;

		const positionSlides = useCallback(
			(index: number) => {
				if (mainSliderRef.current && magnifierSliderRef.current) {
					const slides = mainSliderRef.current.children;
					const magnifierSlides = magnifierSliderRef.current.children;
					const slidesArray = Array.from(slides);
					const magnifierSlidesArray = Array.from(magnifierSlides);

					slidesArray.forEach((slide, i) => {
						const diff = (i - index + totalItems) % totalItems;
						let xPercent;
						if (diff === 0) {
							xPercent = 0;
						} else if (diff === 1) {
							xPercent = 100 + (gap / width) * 100;
						} else if (diff === totalItems - 1) {
							xPercent = -100 - (gap / width) * 100;
						} else {
							xPercent =
								diff < totalItems / 2
									? diff * (100 + (gap / width) * 100)
									: -(totalItems - diff) * (100 + (gap / width) * 100);
						}

						const halfVisible = Math.floor(itemsPerView / 2);

						const shouldBeVisible =
							diff === 0 ||
							diff <= halfVisible ||
							diff >= totalItems - halfVisible;

						gsap.to(slide, {
							xPercent,
							autoAlpha: shouldBeVisible ? 1 : 0,
							duration: 0.3,
							ease: "power2.out",
						});

						gsap.to(magnifierSlidesArray[i], {
							xPercent: xPercent,
							autoAlpha:
								diff === 0 || diff === 1 || diff === totalItems - 1 ? 1 : 0,
							duration: 0.3,
							ease: "power2.out",
						});
					});
				}
			},
			[totalItems, width, gap, itemsPerView]
		);

		useEffect(() => {
			const newIndex = items.findIndex((item) => item.id === currentFocused.id);
			setCurrentIndex(newIndex);
			positionSlides(newIndex);
		}, [currentFocused, items, positionSlides]);

		useLayoutEffect(() => {
			if (mainSliderRef.current && magnifierSliderRef.current) {
				if (!isSwiping) {
					positionSlides(currentIndex);
				} else {
					const partialOffset =
						-(generalDirection / offsetDistance) * (100 + (gap / width) * 100);
					const slides = mainSliderRef.current.children;
					const magnifierSlides = magnifierSliderRef.current.children;
					const slidesArray = Array.from(slides);
					const magnifierSlidesArray = Array.from(magnifierSlides);

					slidesArray.forEach((slide, i) => {
						const diff = (i - currentIndex + totalItems) % totalItems;
						let xPercent;
						if (diff === 0) {
							xPercent = -partialOffset;
						} else if (diff === 1) {
							xPercent = 100 + (gap / width) * 100 - partialOffset;
						} else if (diff === totalItems - 1) {
							xPercent = -100 - (gap / width) * 100 - partialOffset;
						} else {
							xPercent =
								diff < totalItems / 2
									? diff * (100 + (gap / width) * 100) - partialOffset
									: -(totalItems - diff) * (100 + (gap / width) * 100) -
									  partialOffset;
						}
						gsap.to(slide, {
							xPercent,
							duration: 0.1,
							ease: "none",
						});

						gsap.to(magnifierSlidesArray[i], {
							xPercent: xPercent,
							duration: 0.1,
							ease: "none",
						});
					});
				}
			}
		}, [
			generalDirection,
			currentIndex,
			totalItems,
			offsetDistance,
			positionSlides,
			isSwiping,
			magnifierMultiplier,
			width,
			gap,
		]);

		const magnifierContainerWidth = width * magnifierMultiplier * 1.1;

		return (
			<div
				ref={ref}
				className="relative w-full overflow-hidden"
				style={{
					height: `${width * magnifierMultiplier * 1.1 * aspectRatio}px`,
				}}
			>
				<div
					ref={mainSliderRef}
					className="flex absolute top-0 h-full w-full"
					style={{
						left: "50%",
						top: "50%",
						transform: "translate(-50%, -37%)",
						width: `${width}px`,
					}}
				>
					{items.map((item, i) => (
						<div
							key={item.id}
							className="flex-shrink-0 absolute top-0 left-0"
							style={{
								width: `${width}px`,
								height: `${width * aspectRatio}px`,
							}}
						>
							<Image
								src={item.img}
								alt={item.name}
								fill
								className="w-full h-full object-cover"
							/>
						</div>
					))}
				</div>
				<div
					className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-white rounded-lg shadow-lg"
					style={{
						width: `${magnifierContainerWidth}px`,
						height: `${width * magnifierMultiplier * aspectRatio}px`,
					}}
				>
					<div
						ref={magnifierSliderRef}
						className="absolute top-0 left-1/2 transform -translate-x-1/2"
						style={{
							width: `${width * magnifierMultiplier}px`,
							height: `${width * magnifierMultiplier * aspectRatio}px`,
						}}
					>
						{items.map((item, i) => (
							<div
								key={item.id}
								className="flex-shrink-0 absolute top-0 left-0 p-2"
								style={{
									width: "inherit",
									height: "inherit",
								}}
							>
								<Image
									src={item.img}
									alt={item.name}
									fill
									className="w-full h-full object-cover"
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}
);

ImageSliderWithMagnifier.displayName = "ImageSliderWithMagnifier";

export default ImageSliderWithMagnifier;
