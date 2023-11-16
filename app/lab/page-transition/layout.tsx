import ExperienceLayout from "@/features/PageTransition/components/Layout";

export default function Laout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<ExperienceLayout />
			{children}
		</>
	);
}
