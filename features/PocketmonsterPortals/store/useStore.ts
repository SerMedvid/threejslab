import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

type Store = {
	active: string | null;
	setActive: (active: string | null) => void;
	hovered: string | null;
	setHovered: (hovered: string | null) => void;
};

const DEFAULT_PROPS = {
	active: null,
	hovered: null,
};

const useStore = create<Store>()(
	subscribeWithSelector((set, get) => ({
		...DEFAULT_PROPS,
		setActive: (active) =>
			set({ active: active === get().active ? null : active }),
		setHovered: (hovered) => set({ hovered }),
	}))
);

export default useStore;
