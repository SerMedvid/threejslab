import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

type Store = {
	intersected: boolean;
	height: number;
	setIntersected: (intersected: boolean) => void;
	setHeight: (height: number) => void;
};

const DEFAULT_PROPS = {
	intersected: false,
	height: 0,
};

const useStore = create<Store>()(
	subscribeWithSelector((set) => ({
		...DEFAULT_PROPS,
		setIntersected: (intersected) => set({ intersected }),
		setHeight: (height) => set({ height }),
	}))
);

export default useStore;
