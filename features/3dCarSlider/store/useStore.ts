import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { scenes } from "../data";

type Store = {
	currentSlide: number;
	setCurrentSlide: (nextSlide: number) => void;
	totalSlides: number;
};

const useStore = create<Store>()(
	subscribeWithSelector((set) => ({
		currentSlide: 0,
		totalSlides: scenes.length,
		setCurrentSlide: (direction: number) =>
			set((state) => {
				const nextSlide =
					state.currentSlide + direction < 0
						? state.totalSlides - 1
						: (state.currentSlide + direction) % state.totalSlides;

				return {
					currentSlide: nextSlide,
				};
			}),
	}))
);

export default useStore;
