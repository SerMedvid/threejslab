"use client";

import { useTimeout } from "ahooks";
import useStore from "../store/useStore";
import { useEffect, useState } from "react";

import { scenes } from "../data";
import SlideButton from "./SlideButton";

export default function Overlay() {
	const { currentSlide } = useStore();
	const [isVisible, setIsVisible] = useState(false);

	useTimeout(() => {
		setIsVisible(true);
	}, 1000);

	useEffect(() => {
		setIsVisible(false);

		const timeout = setTimeout(() => {
			setIsVisible(true);
		}, 2600);

		return () => {
			clearTimeout(timeout);
		};
	}, [currentSlide]);

	const { name, description, price, range } = scenes[currentSlide];

	return (
		<div
			className={`fixed top-0 left-0  pointer-events-none z-10 h-full w-full ${
				isVisible ? "opacity-100" : "opacity-0"
			}`}
		>
			<SlideButton />
			<SlideButton isNext />

			<div className="absolute bottom-0 from-white/90 bg-gradient-to-t w-full flex  p-10 flex-col items-center">
				<h2 className="font-extrabold text-5xl">{name}</h2>
				<p className="text-center">{description}</p>
				<div>
					<ul className="flex pointer-events-auto gap-12 mt-10 leading-none">
						<li>
							<div className="flex items-center">
								<svg
									viewBox="0 0 24 24"
									fill="none"
									width={24}
									height={24}
									className="mt-[1px]"
								>
									<path
										d="M6 8H4M6 16H4M6 12H3M7 4.51555C8.4301 3.55827 10.1499 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C10.1499 21 8.4301 20.4417 7 19.4845M14 9.49991C13.5 9.37589 12.6851 9.37133 12 9.37589M12 9.37589C11.7709 9.37742 11.9094 9.36768 11.6 9.37589C10.7926 9.40108 10.0016 9.73666 10 10.6874C9.99825 11.7002 11 11.9999 12 11.9999C13 11.9999 14 12.2311 14 13.3124C14 14.125 13.1925 14.4811 12.1861 14.599C12.1216 14.599 12.0597 14.5991 12 14.5994M12 9.37589L12 8M12 14.5994C11.3198 14.6022 10.9193 14.6148 10 14.4999M12 14.5994L12 16"
										stroke="#000000"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									></path>
								</svg>
								<span className="text-3xl font-semibold pl-2">{price}</span>
							</div>
							<p className="text-xs text-center">After tax dedaction</p>
						</li>

						<li>
							<div className="flex items-center">
								<svg
									viewBox="0 0 24 24"
									fill="none"
									width={24}
									height={24}
									className="mt-[1px]"
								>
									<path
										d="M14 8C14 9.10457 13.1046 10 12 10C10.8954 10 10 9.10457 10 8C10 6.89543 10.8954 6 12 6C13.1046 6 14 6.89543 14 8Z"
										stroke="#1C274C"
										strokeWidth="1.5"
									></path>
									<path
										d="M12 20.6875L12.4939 21.2519C12.6566 21.1095 12.75 20.9038 12.75 20.6875C12.75 20.4712 12.6566 20.2655 12.4939 20.1231L12 20.6875ZM21.4263 14.4122C21.1016 14.1549 20.6299 14.2096 20.3727 14.5342C20.1155 14.8589 20.1701 15.3306 20.4948 15.5878L21.4263 14.4122ZM3.50523 15.5878C3.82989 15.3306 3.88455 14.8589 3.62731 14.5342C3.37008 14.2096 2.89836 14.1549 2.5737 14.4122L3.50523 15.5878ZM10.5 19.375L10.9939 18.8106C10.7724 18.6168 10.4581 18.5704 10.1901 18.692C9.9221 18.8136 9.75 19.0807 9.75 19.375H10.5ZM10.5 22H9.75C9.75 22.2943 9.9221 22.5614 10.1901 22.683C10.4581 22.8046 10.7724 22.7582 10.9939 22.5644L10.5 22ZM14.4244 19.8173C14.0123 19.859 13.7121 20.227 13.7538 20.6391C13.7956 21.0512 14.1635 21.3514 14.5756 21.3096L14.4244 19.8173ZM10.5443 19.8948C8.20148 19.756 6.17254 19.2897 4.75556 18.6471C4.04582 18.3252 3.52438 17.9747 3.19064 17.6296C2.86028 17.288 2.75 16.993 2.75 16.75H1.25C1.25 17.494 1.60081 18.1434 2.11244 18.6724C2.62069 19.1979 3.32214 19.644 4.13599 20.0131C5.76619 20.7525 7.98726 21.246 10.4557 21.3922L10.5443 19.8948ZM20.4948 15.5878C21.0684 16.0424 21.25 16.443 21.25 16.75H22.75C22.75 15.7998 22.1833 15.012 21.4263 14.4122L20.4948 15.5878ZM2.75 16.75C2.75 16.443 2.93157 16.0424 3.50523 15.5878L2.5737 14.4122C1.81667 15.012 1.25 15.7998 1.25 16.75H2.75ZM12.4939 20.1231L10.9939 18.8106L10.0061 19.9394L11.5061 21.2519L12.4939 20.1231ZM9.75 19.375V20.6435H11.25V19.375H9.75ZM9.75 20.6435V22H11.25V20.6435H9.75ZM10.9939 22.5644L12.4939 21.2519L11.5061 20.1231L10.0061 21.4356L10.9939 22.5644ZM21.25 16.75C21.25 17.2066 20.8246 17.8623 19.5314 18.5103C18.3014 19.1266 16.522 19.6047 14.4244 19.8173L14.5756 21.3096C16.791 21.0851 18.7617 20.5738 20.2034 19.8514C21.5819 19.1606 22.75 18.1281 22.75 16.75H21.25Z"
										fill="#1C274C"
									></path>
									<path
										d="M6.75 11.9121C6.2644 10.6717 6 9.351 6 8.10747C6 4.73441 8.68629 2 12 2C15.3137 2 18 4.73441 18 8.10747C18 11.4541 16.085 15.3593 13.0972 16.7558C12.4007 17.0814 11.5993 17.0814 10.9028 16.7558C9.94855 16.3098 9.10373 15.6079 8.39578 14.75"
										stroke="#1C274C"
										strokeWidth="1.5"
										strokeLinecap="round"
									></path>
								</svg>
								<span className="text-3xl font-semibold pl-2">{range}km</span>
							</div>
							<p className="text-xs text-center">On one charge</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
