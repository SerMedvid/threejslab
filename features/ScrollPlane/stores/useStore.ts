import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

type Store = {
	play: boolean;
	scrolled: boolean;
	end: boolean;
	setPlay: (play: boolean) => void;
	setScrolled: (scrolled: boolean) => void;
	setEnd: (end: boolean) => void;
};

const useStore = create<Store>()(
	subscribeWithSelector((set, get) => ({
		play: false,
		scrolled: false,
		end: false,
		setPlay: (play) => set({ play }),
		setScrolled: (scrolled) => {
			if (scrolled !== get().scrolled) {
				set({ scrolled });
			}
		},
		setEnd: (end) => set({ end }),
	}))
);

export default useStore;
