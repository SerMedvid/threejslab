import {
	use,
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import useStore from "../stores/useStore";
import { CatmullRomCurve3, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import { degToRad } from "three/src/math/MathUtils.js";

type Props = {
	scale: number;
	slide: number;
};

const vertex = new Vector3();

export default function useMotionPath({ scale, slide }: Props) {
	const slideLength = useStore((state) => state.totalSlides);
	const backgroundObject = useStore((state) => state.backgroundObject);
	const [innerCurve, setInnerCurve] = useState<CatmullRomCurve3 | null>(null);

	const currentSlide = useStore((state) => state.slide);
	const tick = useStore((state) => state.tick);

	const amICurrentOrPrevSlide =
		currentSlide === slide ||
		currentSlide === (slide - 1 < 0 ? slideLength - 1 : slide - 1);

	const transformCurve = useCallback(
		(currentTick = 0) => {
			if (!backgroundObject) return [];

			const clonedMesh = backgroundObject.clone();
			clonedMesh.scale.x *= scale;
			clonedMesh.scale.y *= scale;

			const expectedRotation =
				clonedMesh.rotation.z + (currentTick % 5) * degToRad(72);
			clonedMesh.rotation.z = expectedRotation;

			const positionAttribute = clonedMesh.geometry.getAttribute("position");
			const curvePoints: Vector3[] = [];

			for (let i = 0; i < positionAttribute.count; i++) {
				vertex.fromBufferAttribute(positionAttribute, i);
				vertex.setZ(vertex.z);
				clonedMesh.localToWorld(vertex);
				curvePoints.push(vertex.clone());
			}

			const firstPoint = curvePoints[0];

			curvePoints[0] = curvePoints[1];
			curvePoints[1] = firstPoint;

			return curvePoints;
		},
		[backgroundObject, scale]
	);

	useEffect(() => {
		if (backgroundObject) {
			const curvePoints = transformCurve();

			setInnerCurve(
				new CatmullRomCurve3(curvePoints, false, "catmullrom", 0.5)
			);
		}
	}, [backgroundObject, scale, transformCurve]);

	useFrame(() => {
		if (backgroundObject && innerCurve && amICurrentOrPrevSlide) {
			const curvePoints = transformCurve(tick);

			innerCurve.points = curvePoints;
		}
	});

	return innerCurve;
}
