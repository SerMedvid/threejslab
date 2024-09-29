import { Material, Object3D } from "three";
import gsap from "gsap";

export const formatPrice = (price?: number): string | null => {
	if (price) {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(price);
	}

	return null;
};

export const travelGroupTl = (
	el: Object3D | Object3D[] | null,
	tl: gsap.core.Timeline | undefined,
	options: Record<string, any> = {},
	timing = "-100%"
) => {
	if (el === null) return;

	if ("length" in el) {
		el.forEach((item) => {
			travelGroupTl(item, tl, options);
		});
	} else if ("isGroup" in el && el.isGroup && "children" in el) {
		travelGroupTl(el.children as Object3D[], tl, options);
	} else if ("material" in el && el.material instanceof Material) {
		tl ? tl.to(el.material, options, timing) : gsap.to(el.material, options);

		el.material.needsUpdate = true;
	}
};
