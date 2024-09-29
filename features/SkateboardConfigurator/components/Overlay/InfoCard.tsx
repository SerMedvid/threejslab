import { ElementRef, forwardRef } from "react";
import { formatPrice } from "../../utils";

type InfoCardProps = {
	name?: string;
	price?: number;
	className?: string;
	style?: React.CSSProperties;
};

const InfoCard = forwardRef<ElementRef<"div">, InfoCardProps>(
	({ name, price, className, style }, ref) => {
		return (
			<div
				ref={ref}
				className={`flex flex-col gap-y-2 items-center ${
					className ? className : ""
				}`}
				style={style}
			>
				<h3 className="text-lg ">{name}</h3>
				<p className="text-xl font-semibold">{formatPrice(price)}</p>
			</div>
		);
	}
);

InfoCard.displayName = "InfoCard";

export default InfoCard;
