import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

type Store = {
	isReady: boolean;
	setIsReady: (isReady: boolean) => void;
};

const DEFAULT_PROPS = {
	isReady: false,
};

const useStore = create<Store>()(
	subscribeWithSelector((set) => ({
		...DEFAULT_PROPS,
		setIsReady: (isReady) => set({ isReady }),
	}))
);

export default useStore;
