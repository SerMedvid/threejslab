import "./page.css";
import type { Metadata } from "next";
import { DM_Serif_Display } from "next/font/google";

const dmSerif = DM_Serif_Display({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Scroll Plain",
	description: "Scene with scroll animation",
};

export default function Laout({ children }: { children: React.ReactNode }) {
	return <section className={dmSerif.className}>{children}</section>;
}
