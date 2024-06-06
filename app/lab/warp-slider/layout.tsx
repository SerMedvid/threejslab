import type { Metadata } from "next";
import { Red_Rose, Poppins } from "next/font/google";

const redRose = Red_Rose({
	weight: "700",
	subsets: ["latin"],
	variable: "--font-red-rose",
});
const poppins = Poppins({
	weight: "700",
	subsets: ["latin"],
	variable: "--font-poppins",
});

export const metadata: Metadata = {
	title: "Warp Image Slider",
	description: "Scene with custom image slide animation",
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<section className={`${redRose.variable} ${poppins.className} h-full`}>
			{children}
		</section>
	);
}
