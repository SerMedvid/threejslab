import data from "@/features/PageTransition/data";
import Image from "next/image";
import React from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import BackLink from "@/features/PageTransition/components/BackLink";

export default function PageTransitionArticle({
	params,
}: {
	params: { slug: string };
}) {
	const pageData = data.find((item) => item.id === params.slug);

	if (!pageData) {
		redirect("/page-transition");
	}

	return (
		<>
			<section className="w-full h-[100vh] relative">
				<BackLink />
				<Image
					priority
					alt={pageData.title}
					src={pageData.img}
					fill
					className="object-cover"
				/>
			</section>
			<section className="py-16 px-8 max-w-7xl mx-auto text-lg lg:flex lg:gap-x-10">
				<h1 className="text-4xl font-medium mb-8 lg:max-w-lg lg:text-5xl">
					{pageData.title}
				</h1>
				<p>{pageData.text}</p>
			</section>
		</>
	);
}
