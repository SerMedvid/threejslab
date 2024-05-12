import "./page.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Scroll Procedural Terrain",
	description: "Scene with scroll animation",
};

export default function Laout({ children }: { children: React.ReactNode }) {
	return children;
}
