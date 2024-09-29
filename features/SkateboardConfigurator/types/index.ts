export enum ConfigurationPhase {
	BOARD = 1,
	TRUCK = 2,
	WHEEL = 3,
	FINAL = 4,
}

export enum LayoutOverlay {
	TOP = 1,
	STRATCHED = 2,
}

export type SlideModel = JSX.IntrinsicElements["group"] & {
	texture: string;
	manageOpacity?: boolean;
};
