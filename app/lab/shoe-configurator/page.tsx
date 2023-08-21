import CanvasWrapper from "@/components/CanvasWrapper";
import Experience from "@/features/ShoeConfigurator/components/Experience";
import Overlay from "@/features/ShoeConfigurator/components/Overlay";

export default function Page() {
	return (
		<>
			<CanvasWrapper
				camera={{
					position: [0, 2, 3],
					far: 200,
					near: 0.1,
					fov: 45,
				}}
				shadows
			>
				<Experience />
			</CanvasWrapper>
			<Overlay />
		</>
	);
}
