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
	{
		headline: "Custom fragment shaders",
		tags: ["R3F", "Custom Shaders"],
		description:
			"Custom shaders collection, playing with colors, shape and uv position",
		link: "/lab/shaders-selector",
	},
	{
		headline: "Particles carousel with mouse interaction",
		tags: ["R3F", "Custom Shaders", "Particles", "GSAP", "Carousel"],
		description:
			"Image carousel build on top of particle effect with custom shader. Wave effect on mouse movement",
		link: "/lab/interactive-particles",
	},
	{
		headline: "Particles galaxy",
		tags: ["R3F", "Custom Shaders", "Particles"],
		description:
			"Static and animated version of galaxy generator with configuration options",
		link: "/lab/galaxy",
	},
	{
		headline: "3D carousel",
		tags: ["R3F", "Carousel", "Camera control"],
		description: "3D slider with camera movement showcasing product options",
		link: "/lab/3d-car-slider",
	},
	{
		headline: "3D infinite circle gallery",
		tags: ["R3F", "Carousel", "Custom Shaders", "Mouse interaction"],
		description:
			"3D slider with infinite circullar effect and fabric-like animation",
		link: "/lab/infinite-gallery",
	},
	{
		headline: "Scroll animated plane journey",
		tags: ["R3F", "Scroll", "Custom Shaders"],
		description:
			"Scroll based plane journey with speed up effect, bacground change and text embed",
		link: "/lab/scroll-plane",
	},
	{
		headline: "Page smooth transition",
		tags: ["R3F", "Scroll", "Custom Shaders", "GSAP", "Navigation"],
		description:
			"Awwward smooth transition between WebGL and static pages in NextJS",
		link: "/lab/page-transition",
	},
];
