import CanvasWrapper from "@/components/CanvasWrapper";
import Experience from "@/features/Galaxy/components/Experience";

export default function Page() {
	return (
		<CanvasWrapper
			camera={{
				fov: 50,
				near: 0.001,
				far: 1000,
				position: [0, 20, 30],
			}}
		>
			<Experience />
		</CanvasWrapper>
	);
}
