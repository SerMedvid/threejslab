import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

type Store = {
	offset: number;
	direction: number;
	planeWidth: number;
	setOffset: (offset: number) => void;
	setDirection: (direction: number) => void;
	setPlaneWidth: (planeWidth: number) => void;
};

const useStore = create<Store>()(
	subscribeWithSelector((set) => ({
		offset: 0,
		direction: 1,
		planeWidth: 0,
		setOffset: (offset: number) => set({ offset }),
		setDirection: (direction: number) => set({ direction }),
		setPlaneWidth: (planeWidth: number) => set({ planeWidth }),
	}))
);

export default useStore;
