import useStore, { Direction } from "../store/useStore";
import { motion } from "framer-motion";

const TEXT_TRANSITION_HEIGHT = 150;

export default function Slider() {
	const { prevSlide, nextSlide, items, curSlide, direction } = useStore();
	let prevIdx = direction === Direction.NEXT ? curSlide - 1 : curSlide + 1;

	if (prevIdx === items.length) {
		prevIdx = 0;
	} else if (prevIdx === -1) {
		prevIdx = items.length - 1;
	}

	return (
		<div className="grid place-content-center h-full select-none overflow-hidden pointer-events-none relative z-10">
			{/* MIDDLE CONTAINER */}
			<div className="h-auto w-screen aspect-square max-h-[75vh] md:w-auto md:h-[75vh] md:aspect-[3/4] relative max-w-[100vw]">
				{/* TOP LEFT */}
				<div className="w-48 md:w-72 left-4 md:left-0 md:-translate-x-1/2 absolute -top-8 ">
					<h1
						className="relative antialiased overflow-hidden  
                    text-[5rem] h-[4rem]  leading-[4rem]
                    md:text-[11rem] md:h-[7rem]  md:leading-[7rem] font-bold text-white block"
						style={{ fontFamily: "var(--font-red-rose)" }}
					>
						{items.map((_item, idx) => (
							<motion.span
								key={idx}
								className="absolute top-0 left-0 md:text-center w-full"
								animate={
									idx === curSlide
										? "current"
										: idx === prevIdx
										? "prev"
										: "next"
								}
								variants={{
									current: {
										translateY: 0,
										transition: {
											duration: 0.8,
											from:
												direction === "prev"
													? -TEXT_TRANSITION_HEIGHT
													: TEXT_TRANSITION_HEIGHT,
											type: "spring",
											bounce: 0.2,
											delay: 0.4,
										},
									},
									prev: {
										translateY:
											direction === "prev"
												? TEXT_TRANSITION_HEIGHT
												: -TEXT_TRANSITION_HEIGHT,
										transition: {
											type: "spring",
											bounce: 0.2,
											delay: 0.2,
											from: direction === "start" ? -TEXT_TRANSITION_HEIGHT : 0,
										},
									},
									next: {
										translateY: TEXT_TRANSITION_HEIGHT,
										transition: {
											from: TEXT_TRANSITION_HEIGHT,
										},
									},
								}}
							>
								{items[idx].short}
							</motion.span>
						))}
					</h1>
				</div>
				{/* MIDDLE ARROWS */}
				<button
					className="absolute left-4 md:-left-14 top-1/2 -translate-y-1/2 pointer-events-auto"
					onClick={prevSlide}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-8 h-8 stroke-white hover:opacity-50 transition-opacity duration-300 ease-in-out"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
						/>
					</svg>
				</button>
				<button
					className="absolute right-4 md:-right-14 top-1/2 -translate-y-1/2 pointer-events-auto"
					onClick={nextSlide}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-8 h-8 stroke-white hover:opacity-50 transition-opacity duration-300 ease-in-out"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
						/>
					</svg>
				</button>

				{/* BOTTOM RIGHT */}
				<div className="absolute right-4 md:right-auto md:left-full md:-ml-20 bottom-8">
					<h2
						className="antialiased  font-bold 
            text-transparent text-outline-0.5 
            block overflow-hidden relative w-[50vw]
            text-5xl h-16
            md:text-8xl md:h-28"
						style={{ fontFamily: "var(--font-red-rose)" }}
					>
						{items.map((item, idx) => (
							<motion.div
								key={idx}
								className="absolute top-0 left-0 w-full text-right md:text-left"
								animate={
									idx === curSlide
										? "current"
										: idx === prevIdx
										? "prev"
										: "next"
								}
								variants={{
									current: {
										transition: {
											delay: 0.4,
											staggerChildren: 0.06,
										},
									},
								}}
							>
								{item.title.split("").map((char, idx) => (
									<motion.span
										key={idx}
										className="inline-block" // to make the transform work (translateY)
										variants={{
											current: {
												translateY: 0,
												transition: {
													duration: 0.8,
													from:
														direction === "prev"
															? -TEXT_TRANSITION_HEIGHT
															: TEXT_TRANSITION_HEIGHT,
													type: "spring",
													bounce: 0.2,
												},
											},
											prev: {
												translateY:
													direction === "prev"
														? TEXT_TRANSITION_HEIGHT
														: -TEXT_TRANSITION_HEIGHT,
												transition: {
													duration: 0.8,
													from:
														direction === "start" ? -TEXT_TRANSITION_HEIGHT : 0,
												},
											},
											next: {
												translateY: TEXT_TRANSITION_HEIGHT,
												transition: {
													from: TEXT_TRANSITION_HEIGHT,
												},
											},
										}}
									>
										{char}
									</motion.span>
								))}
							</motion.div>
						))}
					</h2>
				</div>
				<div className="absolute right-4 md:right-auto md:left-full md:top-full md:-mt-10 bottom-8 md:bottom-auto">
					<p className="text-white w-64 text-sm font-thin italic ml-4 relative">
						{items.map((item, idx) => (
							<motion.span
								key={idx}
								className="absolute top-0 left-0 w-full text-right md:text-left"
								animate={
									idx === curSlide
										? "current"
										: idx === prevIdx
										? "prev"
										: "next"
								}
								initial={{
									opacity: 0,
								}}
								variants={{
									current: {
										opacity: 1,
										transition: {
											duration: 1.2,
											delay: 0.6,
											from: 0,
										},
									},
								}}
							>
								{item.description}
							</motion.span>
						))}
					</p>
				</div>
			</div>
		</div>
	);
}
