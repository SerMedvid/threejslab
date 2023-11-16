import { useThree } from "@react-three/fiber";

export const usePlaneDimension = () => {
	const { width } = useThree((state) => state.size);

	const planeWidth = Math.ceil(width * 0.28);
	const planeOfftet = Math.ceil(width * 0.06);
	const totalOffset = planeWidth + planeOfftet;

	return { planeWidth, planeOfftet, totalOffset };
};
