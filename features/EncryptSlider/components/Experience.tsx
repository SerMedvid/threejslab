import { useThree } from "@react-three/fiber";
import Slider from "./Slider";
import ParticlesGroup from "./ParticlesGroup";
import { useTexture } from "@react-three/drei";

export default function Experience() {
	const viewportHeight = useThree((state) => state.viewport.height);

	return (
		<group position-y={viewportHeight / 8}>
			<ParticlesGroup />
			<Slider
				imagesSrc={[
					"/assets/EncryptSlider/5.jpg",
					"/assets/EncryptSlider/1.jpg",
					"/assets/EncryptSlider/2.jpg",
					"/assets/EncryptSlider/3.jpg",
					"/assets/EncryptSlider/4.jpg",
					"/assets/EncryptSlider/5.jpg",
				]}
			/>
		</group>
	);
}

useTexture.preload("/assets/EncryptSlider/1.jpg");
useTexture.preload("/assets/EncryptSlider/2.jpg");
useTexture.preload("/assets/EncryptSlider/3.jpg");
useTexture.preload("/assets/EncryptSlider/4.jpg");
useTexture.preload("/assets/EncryptSlider/5.jpg");
