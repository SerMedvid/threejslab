import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

type Store = {
	clicked: boolean;
	setClicked: (clicked: boolean) => void;
};

const useStore = create<Store>()(
	subscribeWithSelector((set) => ({
		clicked: false,
		setClicked: (clicked) => set({ clicked }),
	}))
);

export default useStore;
