import CanvasWrapper from "@/components/CanvasWrapper";
import Experience from "@/features/ForestRoad/components/Experience";

export default function ForestRoadPage() {
	return (
		<CanvasWrapper
			camera={{
				position: [10.4, 8, 5],
				fov: 50,
			}}
		>
			<color
				args={["black"]}
				attach={"background"}
			/>
			<Experience />
		</CanvasWrapper>
	);
}
