import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

type Store = {
	selected: CONFIG_KEYS | null;
	hovered: CONFIG_KEYS | null;
	config: {
		laces: string;
		mesh: string;
		caps: string;
		inner: string;
		sole: string;
		stripes: string;
		band: string;
		patch: string;
	};
	setColor: (part: CONFIG_KEYS, color: string) => void;
	setSelected: (part: CONFIG_KEYS | null) => void;
	setHovered: (part: CONFIG_KEYS | null) => void;
};

const DEFAULT_PROPS = {
	selected: null,
	hovered: null,
	config: {
		laces: "#FFFFFF",
		mesh: "#FFFFFF",
		caps: "#FFFFFF",
		inner: "#FFFFFF",
		sole: "#FFFFFF",
		stripes: "#FFFFFF",
		band: "#FFFFFF",
		patch: "#FFFFFF",
	},
};

export type CONFIG_KEYS = keyof Store["config"];

const useStore = create<Store>()(
	subscribeWithSelector((set) => ({
		...DEFAULT_PROPS,
		setColor: (part, color) =>
			set((state) => ({ config: { ...state.config, [part]: color } })),
		setSelected: (part) => set({ selected: part }),
		setHovered: (part) => set({ hovered: part }),
	}))
);

export default useStore;
