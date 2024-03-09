import { CameraControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export default function CameraSetup() {
	const camera = useThree((state) => state.camera);

	return <CameraControls camera={camera} />;
}
