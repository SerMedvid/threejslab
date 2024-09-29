import gsap from "gsap";
import { Euler, Group, Quaternion, Vector3 } from "three";
import useStore from "../stores/useStore";

export const boardEnterAnimation = (
	containerRef: React.RefObject<Group>,
	boardHeight: number,
	targetPosition: Vector3
) => {
	if (containerRef.current) {
		containerRef.current.position.set(
			targetPosition.x,
			targetPosition.y,
			targetPosition.z
		);

		containerRef.current.rotation.set(0, 0, 0);
		containerRef.current.applyQuaternion(
			new Quaternion().setFromEuler(
				new Euler(-Math.PI / 2, -Math.PI / 2, 0, "XYZ")
			)
		);

		containerRef.current.scale.set(boardHeight, boardHeight, boardHeight);
	}
};

export const truckEnterAnimation = (
	containerRef: React.RefObject<Group>,
	animationScale: number,
	targetPosition: React.RefObject<Vector3>
) => {
	const tl = gsap.timeline({ defaults: { ease: "power1.in", duration: 0.75 } });

	if (containerRef.current) {
		tl.delay(0.2)

			.to(containerRef.current.rotation, {
				x: -Math.PI,
			})
			.to(
				containerRef.current.scale,
				{
					x: animationScale,
					y: animationScale,
					z: animationScale,
				},
				"<"
			)
			.to(
				containerRef.current.position,
				{
					z: 220,
					y: -90,
					onComplete: () => {
						useStore.getState().setIsTransition(false);
					},
				},
				"<"
			)
			.add(() => {
				if (containerRef.current && targetPosition.current) {
					targetPosition.current.copy(containerRef.current.position);
				}
			});
	}

	return tl;
};

export const wheelEnterAnimation = (
	containerRef: React.RefObject<Group>,
	animationScale: number,
	targetPosition: React.RefObject<Vector3>
) => {
	const tl = gsap.timeline({ defaults: { ease: "power1.in", duration: 0.75 } });

	if (containerRef.current) {
		tl.delay(0.2)

			.to(containerRef.current.rotation, {
				y: -Math.PI,
				x: -Math.PI - 0.2,
			})
			.to(
				containerRef.current.position,
				{
					z: 360,
					x: animationScale,
				},
				"<"
			)
			.to(containerRef.current.rotation, {
				y: -Math.PI,
				delay: 0.75,
				onComplete: () => {
					useStore.getState().setIsTransition(false);
				},
			})
			.add(() => {
				if (containerRef.current && targetPosition.current) {
					targetPosition.current.copy(containerRef.current.position);
				}
			});
	}

	return tl;
};

export const finalPhaseAnimation = (
	containerRef: React.RefObject<Group>,
	boardHeight: number
) => {
	const originalQuaternion = new Quaternion().setFromEuler(
		new Euler(-3.341593, -Math.PI, 0)
	);

	const finalAnimation = { value: 0 };

	const phases = [
		new Quaternion().setFromEuler(
			new Euler(-Math.PI * 1.6, -Math.PI * 1.2, 0, "XZY")
		),
		new Quaternion().setFromEuler(new Euler(-4.65, -4.66, -1.12, "XZY")),
		new Quaternion().setFromEuler(new Euler(-4.86, -4.76, -2, "XZY")),
		new Quaternion().setFromEuler(
			new Euler(-4.86, -4.76, -Math.PI * 1.2, "XZY")
		),
	];

	const tl = gsap.timeline();

	if (containerRef.current) {
		tl.delay(0.3)
			.to(containerRef.current.position, {
				z: boardHeight / 2,
				y: -110,
				x: 0,
				duration: 1.5,
				ease: "expo.out",
			})
			.fromTo(
				finalAnimation,
				{ value: 0 },
				{
					value: 1,
					duration: 0.3,
					ease: "expo.in",
					onUpdate: function () {
						const progress = this.progress();

						if (containerRef.current && progress > 0) {
							containerRef.current.quaternion.slerpQuaternions(
								originalQuaternion,
								phases[0],
								progress
							);
						}
					},
				},
				"<"
			)
			.fromTo(
				finalAnimation,
				{ value: 0 },
				{
					value: 1,
					duration: 0.4,
					ease: "power1.out",
					onUpdate: function () {
						const progress = this.progress();

						if (containerRef.current && progress > 0) {
							containerRef.current.quaternion.slerpQuaternions(
								phases[0],
								phases[1],
								progress
							);
						}
					},
				},
				">"
			)
			.fromTo(
				finalAnimation,
				{ value: 0 },
				{
					value: 1,
					duration: 0.7,
					ease: "linear",
					onUpdate: function () {
						const progress = this.progress();

						if (containerRef.current && progress > 0) {
							containerRef.current.quaternion.slerpQuaternions(
								phases[1],
								phases[2],
								progress
							);
						}
					},
				},
				">"
			)
			.fromTo(
				finalAnimation,
				{ value: 0 },
				{
					value: 1,
					duration: 1.2,
					ease: "power1.in",
					onUpdate: function () {
						const progress = this.progress();

						if (containerRef.current && progress > 0) {
							containerRef.current.quaternion.slerpQuaternions(
								phases[2],
								phases[3],
								progress
							);
						}
					},
				},
				">"
			)
			.to(containerRef.current.position, {
				y: -boardHeight * 4,
				duration: 1,
				delay: 1,
				ease: "expo.inOut",
			});
	}

	return tl;
};
