import { useCallback, useEffect, useRef } from "react";
import { wheels } from "../../../data";
import { Group, Mesh, SRGBColorSpace } from "three";
import useStore from "../../../stores/useStore";
import { useTexture } from "@react-three/drei";
import { useDebounceEffect } from "ahooks";
import { WheelModel } from "../../Models/WheelModel";
import ThreeCustomShaderMaterial from "three-custom-shader-material/vanilla";
import gsap from "gsap";
import { ConfigurationPhase } from "@/features/SkateboardConfigurator/types";

type Props = JSX.IntrinsicElements["group"];

export default function WheelSlider({ visible, ...props }: Props) {
	const ref = useRef<Group>(null);
	const setFocusedWheel = useStore((store) => store.setFocusedWheel);
	const selectedWheel = useStore((store) => store.config.truck);

	const wheelTextures = useTexture(
		wheels.map(({ texture }) => texture),
		(textures) => {
			textures.forEach((texture) => {
				texture.flipY = false;
				texture.colorSpace = SRGBColorSpace;
			});
		}
	);

	useDebounceEffect(
		() => {
			if (!visible && selectedWheel) {
				setFocusedWheel(null);
			}
		},
		[visible, selectedWheel],
		{ wait: 500 }
	);

	useEffect(() => {
		if (visible) {
			setFocusedWheel(wheels[0].id);
		}
	}, [setFocusedWheel, visible]);

	const currentWheelIdx = useRef(0);
	const DEFAULT_TEXTURE = wheelTextures[0];

	useEffect(() => {
		const unsubscribe = useStore.subscribe(
			(state) => state.configurationPhase,
			(currentPhase) => {
				if (currentPhase < ConfigurationPhase.WHEEL) {
					// Reset materials
					if (ref.current) {
						ref.current.traverse((child) => {
							if (child instanceof Mesh && child.material) {
								if (child.material instanceof ThreeCustomShaderMaterial) {
									// Reset custom shader material
									child.material.uniforms.uProgress.value = 0;
									child.material.uniforms.uStartTexture.value = DEFAULT_TEXTURE;
									child.material.uniforms.uEndTexture.value = DEFAULT_TEXTURE;
									child.material.opacity = 0;
								}
								child.material.needsUpdate = true;
							}
						});
					}
					currentWheelIdx.current = 0;
				}
			}
		);

		return () => {
			unsubscribe();
		};
	}, [DEFAULT_TEXTURE]);

	const transitionCallback = useCallback(
		(material: ThreeCustomShaderMaterial, offset: number) => {
			const nextTextureIdx =
				currentWheelIdx.current + offset < 0
					? wheelTextures.length - 1
					: (currentWheelIdx.current + offset) % wheelTextures.length;
			const nextTexture = wheelTextures[nextTextureIdx];

			gsap.set(material.uniforms.uStartTexture, {
				value: wheelTextures[currentWheelIdx.current],
			});
			gsap.set(material.uniforms.uEndTexture, { value: nextTexture });
			gsap.set(material.uniforms.uProgress, { value: 0 });
			gsap;
			gsap.to(material.uniforms.uProgress, {
				value: 1,
				duration: 0.5,
				onComplete: () => {
					currentWheelIdx.current = nextTextureIdx;
				},
			});

			setFocusedWheel(wheels[nextTextureIdx].id);
		},
		[wheelTextures, setFocusedWheel]
	);

	return (
		<group
			{...props}
			visible={visible}
			ref={ref}
		>
			<WheelModel
				texture={wheels[0].texture}
				transitionCallback={transitionCallback}
			/>
		</group>
	);
}

wheels.forEach(({ texture }) => {
	useTexture.preload(texture);
});
