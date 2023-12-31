import CanvasWrapper from "@/components/CanvasWrapper";
import Experience from "@/features/Portal/components/Experience";

export default function PortalPage() {
	return (
		<CanvasWrapper
			camera={{
				position: [3.018654700750873, 2.397252327414448, 3.184478776242781],
				fov: 45,
			}}
		>
			<Experience />
		</CanvasWrapper>
	);
}
