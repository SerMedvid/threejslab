import dynamic from "next/dynamic";
import { Suspense } from "react";

const Layout = dynamic(
	() => import("@/features/CurvedImageGallery/components/Layout"),
	{
		ssr: false,
	}
);

export default function CurvedImageGalleryPage() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Layout />
		</Suspense>
	);
}
