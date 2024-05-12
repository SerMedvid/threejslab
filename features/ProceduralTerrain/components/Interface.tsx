import { Html, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { ElementRef, useRef } from "react";

export default function Interface() {
	const scrollData = useScroll();
	const ref = useRef<ElementRef<"h2">>(null);

	useFrame(() => {
		if (!ref.current) {
			return;
		}

		const scrollOffset = scrollData.offset;

		if (scrollOffset < 0.3) {
			const time = (4.5 - scrollData.range(0, 0.3) * 3.5).toFixed(1);

			ref.current.innerText = `${time} billion years BC`;
		} else if (scrollOffset < 0.95) {
			const time = (999 - scrollData.range(0.3, 0.65) * 998).toFixed(1);

			ref.current.innerText = `${time} million years BC`;
		} else {
			const time = Math.round(2024 * scrollData.range(0.95, 0.05));

			ref.current.innerText = `${time}`;
		}
	});

	return (
		<Html
			center
			wrapperClass="yearWrapper"
		>
			<h2
				ref={ref}
				className="whitespace-nowrap text-white bg-black text-lg lg:text-2xl py-3 px-6 rounded"
			></h2>
		</Html>
	);
}
