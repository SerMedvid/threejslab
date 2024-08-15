import { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement> & {
	size?: number;
	children: React.ReactNode;
};

export default function SvgIcon({
	children,
	viewBox = "0 0 64 64",
	size = 24,
	fill = "#000000",
	...rest
}: Props) {
	return (
		<svg
			width={size}
			height={size}
			viewBox={viewBox}
			{...rest}
			fill={fill}
			xmlns="http://www.w3.org/2000/svg"
		>
			{children}
		</svg>
	);
}
