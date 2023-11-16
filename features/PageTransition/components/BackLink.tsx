"use client";

import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function BackLink() {
	const ref = useRef<HTMLAnchorElement>(null);

	useEffect(() => {
		gsap.to(ref.current, {
			opacity: 1,
			y: 0,
		});
	}, []);

	return (
		<div className="absolute top-8 left-8 overflow-hidden z-10">
			<Link
				className=" bg-black text-white z-10 px-6 py-2 flex opacity-0 translate-y-full"
				href={"/lab/page-transition"}
				ref={ref}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					fill="white"
				>
					<path d="m12.707 4.707-1.414-1.414L4.586 10l6.707 6.707 1.414-1.414L8.414 11H17v9h2V9H8.414l4.293-4.293z" />
				</svg>
				Back
			</Link>
		</div>
	);
}
