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
import useStore from "../../stores/useStore";
import InfoCard from "./InfoCard";
import Button from "../Button";
import gsap from "gsap";
import { Details } from "../../data";
import { LayoutOverlay } from "../../types";
import { useDeepCompareEffect } from "ahooks";

type Props = {
	header: string;
	onClick: () => void;
	children?: React.ReactNode;
	items: Details[];
	currentFocused: Details;
	visible: boolean;
	delay?: number;
	layout?: LayoutOverlay;
	offsetDistance: number;
};

const BaseOverlay = forwardRef(
	(
		{
			header,
			items,
			currentFocused,
			children,
			onClick,
			visible,
			delay = 0,
			layout = LayoutOverlay.TOP,
			offsetDistance,
		}: Props,
		ref: ForwardedRef<HTMLDivElement>
	) => {
		const isSwiping = useStore((store) => store.isSwiping);
		const generalDirection = useStore((store) => store.generalDirection);
		const sliderRef = useRef<ElementRef<"div">>(null);
		const headerContainerRef = useRef<ElementRef<"div">>(null);
		const childrenContainerRef = useRef<ElementRef<"div">>(null);
		const detailsContainerRef = useRef<ElementRef<"div">>(null);
		const [currentIndex, setCurrentIndex] = useState(
			items.findIndex((item) => item.id === currentFocused.id)
		);
		const [slideHeight, setSlideHeight] = useState(0);
		const totalItems = items.length;

		const updateSlideHeight = useCallback(() => {
			if (sliderRef.current && sliderRef.current.children.length > 0) {
				const firstSlide = sliderRef.current.children[0] as HTMLElement;
				setSlideHeight(firstSlide.offsetHeight);
			}
		}, []);

		const positionSlides = useCallback(
			(index: number) => {
				if (sliderRef.current) {
					const slides = sliderRef.current.children;
					const slidesArray = Array.from(slides);
					slidesArray.forEach((slide, i) => {
						const diff = (i - index + totalItems) % totalItems;
						let xPercent;
						if (diff === 0) {
							xPercent = 0;
						} else if (diff === 1) {
							xPercent = 100;
						} else if (diff === totalItems - 1) {
							xPercent = -100;
						} else {
							xPercent =
								diff < totalItems / 2
									? 100 + diff * 100
									: -100 - (totalItems - diff) * 100;
						}
						gsap.to(slide, {
							xPercent,
							autoAlpha:
								diff === 0 || diff === 1 || diff === totalItems - 1 ? 1 : 0,
							duration: 0.3,
							ease: "power2.out",
						});
					});
				}
			},
			[totalItems]
		);

		useEffect(() => {
			updateSlideHeight();
			window.addEventListener("resize", updateSlideHeight);
			return () => {
				window.removeEventListener("resize", updateSlideHeight);
			};
		}, [updateSlideHeight]);

		useDeepCompareEffect(() => {
			const newIndex = items.findIndex((item) => item.id === currentFocused.id);
			setCurrentIndex(newIndex);
			positionSlides(newIndex);
		}, [currentFocused, items, positionSlides]);

		useEffect(() => {
			const tl = gsap
				.timeline()
				.delay(visible ? delay : 0)
				.to(headerContainerRef.current, {
					autoAlpha: visible ? 1 : 0,
					yPercent: visible ? 0 : 2,
					duration: visible ? 0.5 : 0.25,
				})
				.to(
					childrenContainerRef.current,
					{
						autoAlpha: visible ? 1 : 0,
						yPercent: visible ? 0 : -2,
						duration: visible ? 0.5 : 0.25,
					},
					0
				)
				.to(
					detailsContainerRef.current,
					{
						autoAlpha: visible ? 1 : 0,
						yPercent: visible ? 0 : -2,
						duration: visible ? 0.5 : 0.25,
					},
					0
				);

			return () => {
				tl.kill();
			};
		}, [visible, delay]);

		useLayoutEffect(() => {
			if (sliderRef.current) {
				if (!isSwiping) {
					positionSlides(currentIndex);
				} else {
					const partialOffset = -(generalDirection / offsetDistance) * 100;
					const slides = sliderRef.current.children;
					const slidesArray = Array.from(slides);
					slidesArray.forEach((slide, i) => {
						const diff = (i - currentIndex + totalItems) % totalItems;
						let xPercent;
						if (diff === 0) {
							xPercent = -partialOffset;
						} else if (diff === 1) {
							xPercent = 100 - partialOffset;
						} else if (diff === totalItems - 1) {
							xPercent = -100 - partialOffset;
						} else {
							xPercent =
								diff < totalItems / 2
									? 100 + diff * 100 - partialOffset
									: -100 - (totalItems - diff) * 100 - partialOffset;
						}
						gsap.to(slide, {
							xPercent,
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
		]);

		return (
			<div
				ref={ref}
				className="pointer-events-none absolute w-full h-full top-0 left-0 flex z-10 items-center flex-col"
			>
				<div
					className={`text-3xl ${
						layout === LayoutOverlay.TOP ? "pt-[5svh]" : "pt-[10svh] flex-auto"
					}   opacity-0`}
					ref={headerContainerRef}
				>
					<h2>{header}</h2>
				</div>

				<div
					ref={childrenContainerRef}
					className="w-full opacity-0"
				>
					{children}
				</div>

				<div
					className={`pointer-events-auto overflow-hidden relative ${
						layout === LayoutOverlay.TOP ? "pt-4" : "pb-[5svh]"
					}   gap-y-6 flex flex-col opacity-0 w-80 `}
					ref={detailsContainerRef}
				>
					<div
						ref={sliderRef}
						className="flex relative"
						style={{ height: `${slideHeight}px` }}
					>
						{items.map((item, index) => (
							<InfoCard
								key={item.id}
								name={item.name}
								price={item.price}
								className="flex-shrink-0 w-full absolute top-0 left-0"
							/>
						))}
					</div>
					<div className="flex justify-center">
						<Button
							onClick={onClick}
							disabled={isSwiping}
						>
							Select
						</Button>
					</div>
				</div>
			</div>
		);
	}
);

BaseOverlay.displayName = "BaseOverlay";

export default BaseOverlay;
