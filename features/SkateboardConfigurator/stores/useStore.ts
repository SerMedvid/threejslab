import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { ConfigurationPhase } from "../types";

type Store = {
	configurationPhase: ConfigurationPhase;
	config: {
		board: string | null;
		truck: string | null;
		wheel: string | null;
	};
	movementX: number;
	focusedBoard: string | null;
	focusedTruck: string | null;
	focusedWheel: string | null;
	isSwiping: boolean;
	isTransition: boolean;
	generalDirection: number;
	setBoard: (boardId: string | null) => void;
	setTruck: (truckId: string | null) => void;
	setWheel: (wheelId: string | null) => void;
	setFocusedBoard: (boardId: string | null) => void;
	setFocusedTruck: (truckId: string | null) => void;
	setFocusedWheel: (wheelId: string | null) => void;
	setMovementX: (movementX: number) => void;
	setIsSwiping: (isSwiping: boolean) => void;
	setIsTransition: (isTransition: boolean) => void;
	setGeneralDirection: (generalDirection: number) => void;
	reset: () => void;
};

const DEFAULT_PROPS = {
	configurationPhase: ConfigurationPhase.BOARD,
	movementX: 0,
	generalDirection: 0,
	isSwiping: false,
	isTransition: false,
	focusedBoard: null,
	focusedTruck: null,
	focusedWheel: null,
	config: {
		board: null,
		truck: null,
		wheel: null,
	},
};

export type CONFIG_KEYS = keyof Store["config"];

const useStore = create<Store>()(
	subscribeWithSelector((set, get) => ({
		...DEFAULT_PROPS,
		setBoard: (boardId) =>
			set((state) => ({
				config: { ...state.config, board: boardId },
				configurationPhase: ConfigurationPhase.TRUCK,
			})),
		setTruck: (truckId) =>
			set((state) => ({
				config: { ...state.config, truck: truckId },
				configurationPhase: ConfigurationPhase.WHEEL,
			})),
		setWheel: (wheelId) =>
			set((state) => ({
				config: { ...state.config, wheel: wheelId },
				configurationPhase: ConfigurationPhase.FINAL,
			})),
		setMovementX: (movementX) => {
			set({ movementX });

			if (get().isSwiping) {
				const totalMovement = get().generalDirection + movementX;
				set({ generalDirection: totalMovement });
			} else {
				set({ generalDirection: 0 });
			}
		},
		setIsSwiping: (isSwiping) => set({ isSwiping }),
		setFocusedBoard: (boardId) => set({ focusedBoard: boardId }),
		setFocusedTruck: (truckId) => set({ focusedTruck: truckId }),
		setFocusedWheel: (wheelId) => set({ focusedWheel: wheelId }),
		setIsTransition: (isTransition) => set({ isTransition }),
		setGeneralDirection: (generalDirection) => set({ generalDirection }),
		reset: () => set({ ...DEFAULT_PROPS, focusedBoard: "1" }),
	}))
);

export default useStore;
