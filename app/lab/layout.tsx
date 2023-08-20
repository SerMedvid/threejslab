import type { Metadata } from "next";
import "./lab.css";

export const metadata: Metadata = {
	title: "ThreeJS lab",
	description: "Collection of ThreeJS Experinces",
};

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<main className="relative  m-0 w-full h-full left-0 top-0">{children}</main>
	);
}
