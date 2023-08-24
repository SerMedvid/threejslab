import { FeatureCard } from "@/types";

export const projects: FeatureCard[] = [
	{
		headline: "Day/Night Earth",

		tags: [
			"Mouse interaction",
			"Multiple scenes",
			"Realistic textures",
			"R3F",
			"Zustand",
			"GSAP",
		],
		description:
			"Earth mesh with randomized planes paths. Day/night shift on mouse interaction",
		link: "/lab/earth-day-and-night",
	},
	{
		headline: "Shoe configurator",
		tags: ["Mouse interaction", "R3F", "Zustand", "Color Picker", "GSAP"],
		description: "Shoe product configurator with color picker functionality",
		link: "/lab/shoe-configurator",
	},
	{
		headline: "Particles exploding carousel with video",
		tags: ["Particles", "R3F", "Carousel", "Custom Shaders", "GSAP"],
		description:
			"Particles transition effect between videos. Created with custom shaders. Inspired by https://www.m-trust.co.jp",
		link: "/lab/exploding-particles",
	},
];
