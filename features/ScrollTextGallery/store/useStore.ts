import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

type Store = {
	currentIndex: number;
	currentIndexOffset: number;
	setCurrentIndex: (currentIndex: number) => void;
	setCurrentIndexOffset: (currentIndexOffset: number) => void;
};

const DEFAULT_PROPS = {
	currentIndex: 0,
	currentIndexOffset: 0,
};

const useStore = create<Store>()(
	subscribeWithSelector((set) => ({
		...DEFAULT_PROPS,
		setCurrentIndex: (currentIndex) => set({ currentIndex }),
		setCurrentIndexOffset: (currentIndexOffset) => set({ currentIndexOffset }),
	}))
);

export default useStore;
