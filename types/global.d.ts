import { ReactThreeFiber } from "@react-three/fiber";
import { RoundedPlaneGeometry } from "maath/geometry";

declare global {
	namespace JSX {
		interface IntrinsicElements {
			roundedPlaneGeometry: ReactThreeFiber.Object3DNode<
				RoundedPlaneGeometry,
				typeof RoundedPlaneGeometry
			>;
		}
	}
}
