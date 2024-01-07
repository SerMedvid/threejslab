import CanvasWrapper from "@/components/CanvasWrapper";
import Experience from "@/features/SceneTransition/components/Experience";

export default function SceneTransitionPage() {
	return (
		<CanvasWrapper>
			<color
				args={["black"]}
				attach={"background"}
			/>
			<Experience />
		</CanvasWrapper>
	);
}
