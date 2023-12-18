import { Html } from "@react-three/drei";
import { ComponentProps } from "react";
import useStore from "../store/useStore";

type Props = ComponentProps<typeof Html> & {
	title: string;
	description: string;
	price: number | string;
	bgColor: string;
};

const OverlayItem = ({
	className = "",
	title,
	description,
	price,
	bgColor,
	visible,
	...props
}: Props) => {
	const currentPage = useStore((state) => state.currentPage);

	if (!visible) return null;

	return (
		<Html
			transform
			distanceFactor={1.2}
			center
			className={`w-48 rounded-md overflow-hidden ${
				currentPage === "store" ? "" : "opacity-0"
			} transition-opacity duration-1000 ${className}`}
			{...props}
		>
			<div className="bg-white bg-opacity-50 backdrop-blur-lg text-xs p-2 w-full">
				<h2 className="font-bold">{title}</h2>
				<p>{description}</p>
			</div>
			<button
				className={`${bgColor} hover:bg-opacity-50 transition-colors duration-500 px-4 py-2 font-bold text-white w-full text-xs`}
			>
				Add to cart ${price}
			</button>
		</Html>
	);
};

export default OverlayItem;
