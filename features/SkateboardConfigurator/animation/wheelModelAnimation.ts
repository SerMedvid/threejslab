import gsap from "gsap";
import { Material, Mesh } from "three";

export const wheelApperAnimation = (
	wheelRef: React.RefObject<Mesh>,
	material: Material
) => {
	const tl = gsap.timeline({ defaults: { duration: 0.7, ease: "power2.in" } });

	if (wheelRef.current) {
		tl.delay(0.75)
			.set(wheelRef.current, {
				visible: true,
			})
			.from(
				wheelRef.current.position,
				{
					z: 2,
				},
				"<"
			)
			.to(
				material,
				{
					opacity: 1,
				},
				"<"
			)
			.from(
				wheelRef.current.rotation,
				{
					z: -5 * Math.PI,
					ease: "back.out(2.5)",
					duration: 1.4,
				},
				"<"
			);
	}

	return tl;
};
