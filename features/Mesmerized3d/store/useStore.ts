import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { Mesmerized3dPage } from "../types";

type Store = {
	currentPage: Mesmerized3dPage;
	setCurrentPage: (page: Mesmerized3dPage) => void;
};

const DEFAULT_PROPS = {
	currentPage: Mesmerized3dPage.INTRO,
};

const useStore = create<Store>()(
	subscribeWithSelector((set) => ({
		...DEFAULT_PROPS,
		setCurrentPage: (currentPage) => set({ currentPage }),
	}))
);

export default useStore;
