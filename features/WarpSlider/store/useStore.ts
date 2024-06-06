import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export enum Direction {
	START = "start",
	NEXT = "next",
	PREV = "prev",
}

type Store = {
	curSlide: number;
	direction: Direction;
	items: {
		image: string;
		short: string;
		title: string;
		description: string;
		color: string;
	}[];
	nextSlide: () => void;
	prevSlide: () => void;
};

const DEFAULT_PROPS = {
	curSlide: 0,
	direction: Direction.START,
	items: [
		{
			image: "/assets/WarpSlider/textures/optimized/1.jpg",
			short: "AF",
			title: "Discover",
			description: "Become one with nature.",
			color: "#bf7e39",
		},
		{
			image: "/assets/WarpSlider/textures/optimized/2.jpg",
			short: "PO",
			title: "Free",
			color: "#A6A528",
			description: "Forger your worries.",
		},
		{
			image: "/assets/WarpSlider/textures/optimized/3.jpg",
			short: "VT",
			title: "Choose",
			color: "#00461D",
			description: "Find your own path.",
		},
		{
			image: "/assets/WarpSlider/textures/optimized/4.jpg",
			short: "IU",
			title: "Create",
			color: "#ce5250",
			description: "Allow yourself to be inspired.",
		},
		{
			image: "/assets/WarpSlider/textures/optimized/5.jpg",
			short: "PH",
			title: "Relax",
			description: "Enjoy your peace of mind.",
			color: "#201d24",
		},
		{
			image: "/assets/WarpSlider/textures/optimized/6.jpg",
			short: "TK",
			title: "Breath",
			color: "#263a27",
			description: "Feel the nature surrounding you.",
		},
		{
			image: "/assets/WarpSlider/textures/optimized/7.jpg",
			short: "OZ",
			title: "Travel",
			color: "#8b6d40",
			description: "Brave the unknown.",
		},
		{
			image: "/assets/WarpSlider/textures/optimized/8.jpg",
			short: "SK",
			title: "Calm",
			color: "#72a3ca",
			description: "Free your mind.",
		},
		{
			image: "/assets/WarpSlider/textures/optimized/9.jpg",
			short: "AU",
			title: "Feel",
			color: "#c67e90",
			description: "Emotions and experiences.",
		},
		{
			image: "/assets/WarpSlider/textures/optimized/10.jpg",
			short: "RB",
			title: "Spot",
			color: "#e5c9ff",
			description: "See the beauty in everything.",
		},
	],
};

const useStore = create<Store>()(
	subscribeWithSelector((set) => ({
		...DEFAULT_PROPS,
		nextSlide: () =>
			set((state) => ({
				curSlide: (state.curSlide + 1) % state.items.length,
				direction: Direction.NEXT,
			})),
		prevSlide: () =>
			set((state) => ({
				curSlide:
					(state.curSlide - 1 + state.items.length) % state.items.length,
				direction: Direction.PREV,
			})),
	}))
);

export default useStore;
