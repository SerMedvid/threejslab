import { useTexture } from "@react-three/drei";
import { useLayoutEffect } from "react";
import { Mesh, PlaneGeometry } from "three";

type Props = {
	nodes: {
		DisplayRightPlane001: Mesh;
	};
};

export default function RightDisplay({ nodes }: Props) {
	const banner = useTexture(
		"/assets/VendingMachine/vendingmachine-sign.jpg",
		(texture) => {
			texture.flipY = false;
		}
	);

	useLayoutEffect(() => {
		/** reset uv */
		nodes.DisplayRightPlane001.geometry.attributes.uv = new PlaneGeometry(
			1,
			1
		).attributes.uv;
	}, [nodes.DisplayRightPlane001.geometry]);

	return (
		<mesh geometry={nodes.DisplayRightPlane001.geometry}>
			<meshBasicMaterial map={banner} />
		</mesh>
	);
}

useTexture.preload("/assets/VendingMachine/vendingmachine-sign.jpg");
