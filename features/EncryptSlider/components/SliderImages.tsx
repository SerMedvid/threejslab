import { useEffect, useRef, useState } from "react";
import { VisualData } from "./Slider";
import { Raycaster, Vector2 } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import useStore from "../store/useStore";
import { Image } from "@react-three/drei";

type Props = {
	items: VisualData[];
};

const center = new Vector2(0, 0);

export default function SliderImages({ items }: Props) {
	const [raycaster] = useState(() => new Raycaster());
	const elems = useRef<any[]>([]);
	const camera = useThree((state) => state.camera);

	const setIntersected = useStore((state) => state.setIntersected);

	useEffect(() => {
		raycaster.setFromCamera(center, camera);
	}, [camera, raycaster]);

	useFrame(() => {
		const isIntersecting = !!raycaster.intersectObjects(elems.current).length;

		setIntersected(isIntersecting);
	});

	return (
		<group>
			{items.map(({ texture, width, height, offset }, idx) => (
				// eslint-disable-next-line jsx-a11y/alt-text
				<Image
					ref={(el) => (elems.current[idx] = el)}
					key={idx}
					texture={texture}
					scale={[width, height]}
					position-x={offset}
				/>
			))}
		</group>
	);
}
