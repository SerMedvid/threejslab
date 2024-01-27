import { useCursor } from "@react-three/drei";
import useStore from "../store/useStore";

export default function Cursor() {
	const hovered = useStore((state) => state.hovered);

	useCursor(!!hovered);

	return null;
}
