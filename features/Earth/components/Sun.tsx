import { useTexture } from "@react-three/drei";
import React, { useEffect, useRef } from "react";
import { Color, Mesh, Vector3 } from "three";
import { Lensflare, LensflareElement } from "three/addons/objects/Lensflare.js";

type Props = {
	sunDirection: Vector3;
};

export default function Sun({ sunDirection }: Props) {
	const ref = useRef<Mesh>(null);
	const [textureFlare0, textureFlare3] = useTexture([
		"/assets/Earth/lenses/lensflare0.png",
		"/assets/Earth/lenses/lensflare1.png",
	]);

	useEffect(() => {
		const lensflare = new Lensflare();
		lensflare.addElement(
			new LensflareElement(
				textureFlare0,
				500,
				0,
				new Color(1, 0.86, 0.39).multiplyScalar(1.5)
			)
		);

		lensflare.addElement(new LensflareElement(textureFlare3, 60, 0.6));
		lensflare.addElement(new LensflareElement(textureFlare3, 70, 0.7));
		lensflare.addElement(new LensflareElement(textureFlare3, 120, 0.9));
		lensflare.addElement(new LensflareElement(textureFlare3, 70, 1));

		ref.current?.add(lensflare);
	}, [textureFlare0, textureFlare3]);

	return (
		<group>
			<mesh
				position={sunDirection.clone().multiplyScalar(10)}
				ref={ref}
			>
				<icosahedronGeometry args={[0.1, 2]} />
				<meshBasicMaterial color={new Color(1, 0.86, 0.39)} />
			</mesh>
		</group>
	);
}
