import { useGSAP } from "@gsap/react";
import useStore from "../../stores/useStore";
import Button from "../Button";
import { useRef } from "react";
import Image from "next/image";
import { Details, getBoardById, getTruckById, getWheelById } from "../../data";
import { formatPrice } from "../../utils";
import gsap from "gsap";

function ListItem({ item }: { item: Details }) {
	return (
		<li className="flex w-full items-center gap-4">
			<Image
				src={item.img}
				alt={item.name}
				width={100}
				height={100}
				className="w-14 h-14 object-contain"
			/>
			<span className="text-sm flex-auto">{item.name}</span>
			<span className="text-sm font-bold">{formatPrice(item.price)}</span>
		</li>
	);
}

type Props = {
	visible: boolean;
	delay?: number;
};

const calculateTotalPrice = (prices: (number | undefined)[]) => {
	return formatPrice(
		prices.reduce<number>((acc, price) => acc + (price || 0), 0)
	);
};

function FinalOverlay({ visible, delay = 0.5 }: Props) {
	const config = useStore((state) => state.config);
	const reset = useStore((state) => state.reset);

	const headerContainerRef = useRef<HTMLDivElement>(null);
	const listContainerRef = useRef<HTMLUListElement>(null);
	const detailsContainerRef = useRef<HTMLDivElement>(null);

	const board = getBoardById(config.board);
	const truck = getTruckById(config.truck);
	const wheel = getWheelById(config.wheel);

	useGSAP(() => {
		const tl = gsap
			.timeline()
			.delay(visible ? delay : 0)
			.to(headerContainerRef.current, {
				autoAlpha: visible ? 1 : 0,
				yPercent: visible ? 0 : 2,
				duration: visible ? 0.5 : 0.25,
			})
			.to(
				listContainerRef.current,
				{
					autoAlpha: visible ? 1 : 0,
					yPercent: visible ? 0 : -2,
					duration: visible ? 0.5 : 0.25,
				},
				"+=2"
			)
			.to(
				detailsContainerRef.current,
				{
					autoAlpha: visible ? 1 : 0,
					yPercent: visible ? 0 : -2,
					duration: visible ? 0.5 : 0.25,
				},
				"<"
			);

		return () => {
			tl.kill();
		};
	}, [visible, delay]);

	return (
		<div className="pointer-events-none absolute h-full top-0  flex z-10 items-center flex-col left-1/2 transform -translate-x-1/2 w-72 md:w-96">
			<div
				className={`text-3xl pt-[5svh] mb-7 opacity-0`}
				ref={headerContainerRef}
			>
				<h2>Your skateboard</h2>
			</div>

			<ul
				ref={listContainerRef}
				className=" opacity-0 flex flex-col gap-3 w-full"
			>
				{board && <ListItem item={board} />}
				{truck && <ListItem item={truck} />}
				{wheel && <ListItem item={wheel} />}
				<ListItem
					item={{
						name: "Independent Hardware and grip tape",
						price: 8.69,
						id: "independent-hardware-and-grip-tape",
						texture: "independent-hardware-and-grip-tape",
						img: "/assets/SkateboardConfigurator/images/griptape.jpg",
					}}
				/>
			</ul>

			<div
				ref={detailsContainerRef}
				className="w-full opacity-0 mt-2"
			>
				<p className="text-xl font-bold py-5 text-center">
					{calculateTotalPrice([
						board?.price,
						truck?.price,
						wheel?.price,
						8.69,
					])}
				</p>

				<div className="flex justify-center pointer-events-auto">
					<Button onClick={reset}>Add to cart</Button>
				</div>
			</div>
		</div>
	);
}

export default FinalOverlay;
