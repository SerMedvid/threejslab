import { Suspense, useLayoutEffect } from "react";
import { Mesh, PlaneGeometry } from "three";
import VideoMaterial from "./VideoMaterial";

type Props = {
	nodes: {
		DisplayTopPlane001: Mesh;
	};
};

export default function TopDisplay({ nodes }: Props) {
	useLayoutEffect(() => {
		/** reset uv */
		nodes.DisplayTopPlane001.geometry.attributes.uv = new PlaneGeometry(
			1,
			1
		).attributes.uv;
	}, [nodes.DisplayTopPlane001.geometry]);

	return (
		<mesh geometry={nodes.DisplayTopPlane001.geometry}>
			<Suspense fallback={null}>
				<VideoMaterial src={"/assets/VendingMachine/commercial.webm"} />
			</Suspense>
		</mesh>
	);
}
