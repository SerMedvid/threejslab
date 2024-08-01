import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

import { slides } from "../data";

type Store = {
	isHovered: boolean;
	setIsHovered: (isHovered: boolean) => void;
	slides: typeof slides;
	slideLength: number;
};

const useStore = create<Store>()(
	subscribeWithSelector((set, get) => ({
		isHovered: false,
		setIsHovered: (isHovered) => set({ isHovered }),
		slides,
		slideLength: slides.length,
	}))
);

export default useStore;
