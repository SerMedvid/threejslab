import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

type Store = {
	clicked: number | null;
	imgs: string[];
	imgNum: number;
	setClicked: (clicked: number | null) => void;
};

const imgs = [...Array(16)].map(
	(_, idx) => `/assets/FurnitureGallery/${idx + 1}.jpg`
);

const DEFAULT_PROPS = {
	clicked: null,
	imgs,
	imgNum: imgs.length,
};

const useStore = create<Store>()(
	subscribeWithSelector((set) => ({
		...DEFAULT_PROPS,
		setClicked: (clicked) => set({ clicked }),
	}))
);

export default useStore;
