import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

type Store = {
	isDay: boolean;
	toggleDaytime: (isDay: boolean) => void;
};

const useStore = create<Store>()(
	subscribeWithSelector((set) => ({
		isDay: true,
		toggleDaytime: (isDay: boolean) => set({ isDay }),
	}))
);

export default useStore;
