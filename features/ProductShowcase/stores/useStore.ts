import { CatmullRomCurve3, Mesh } from "three";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

type Store = {
	slide: number;
	tick: number;
	interacted: boolean;
	setNextSlide: () => void;
	setNextTick: () => void;
	totalSlides: number;
	curve: CatmullRomCurve3 | null;
	setCurve: (curve: CatmullRomCurve3) => void;
	backgroundObject: Mesh | null;
	setBackgroundObject: (object: Mesh) => void;
	reset: () => void;
	setInteracted: (interacted: boolean) => void;
};

const INIT = {
	slide: 0,
	tick: 0,
	interacted: false,
};

const useStore = create<Store>()(
	subscribeWithSelector((set, get) => ({
		...INIT,
		curve: null,
		backgroundObject: null,
		totalSlides: 3,
		setNextSlide: () => set({ slide: (get().slide + 1) % get().totalSlides }),
		setNextTick() {
			get().setNextSlide();
			set({ tick: get().tick + 1, interacted: true });
		},
		setCurve: (curve) => set({ curve }),
		setBackgroundObject: (object) => set({ backgroundObject: object }),
		setInteracted: (interacted) => set({ interacted }),
		reset: () => set({ ...INIT }),
	}))
);

export default useStore;
