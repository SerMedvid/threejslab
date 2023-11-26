import { PixelSizeCamera } from "@/components/PixelSizeCamera";
import DesertModel from "./DesertModel";

export default function Experience() {
	return (
		<>
			<PixelSizeCamera distance={600} />

			<DesertModel />
		</>
	);
}
