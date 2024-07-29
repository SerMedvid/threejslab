import { useFrame, useThree } from "@react-three/fiber";

import fragmentShader from "../shaders/fragment.glsl";
import vertexShader from "../shaders/vertex.glsl";
import { useTexture } from "@react-three/drei";
import { useControls } from "leva";
import { Color, ShaderMaterial, Vector2 } from "three";
import { useEffect, useRef, useState } from "react";

export default function Model() {
	const { width, height } = useThree((state) => state.viewport);
	const [imgResolution, setImgResolution] = useState([0, 0]);

	const { image, refColor } = useControls({
		image: {
			label: "Image",
			image: "/assets/ColorBoost/japan.jpg",
		},
		refColor: {
			label: "Boost Color",
			value: "#cb8ba8",
		},
	});

	const imgSrc = image || "/assets/checker.jpg";

	useEffect(() => {
		const img = new Image();
		img.src = imgSrc;
		img.onload = () => {
			setImgResolution([img.width, img.height]);
		};
	}, [imgSrc]);

	const texutre = useTexture(imgSrc);
	const materialRef = useRef<ShaderMaterial>(null);

	useFrame(({ pointer }) => {
		if (materialRef.current?.uniforms) {
			materialRef.current.uniforms.uPointerCoords.value = [
				pointer.x,
				pointer.y,
			];
		}
	});

	return (
		<mesh>
			<planeGeometry args={[width, height]} />
			<shaderMaterial
				ref={materialRef}
				key={Date.now()}
				fragmentShader={fragmentShader}
				vertexShader={vertexShader}
				uniforms={{
					uTexture: { value: texutre },
					uRefColor: { value: new Color(refColor) },
					uTexureResolution: { value: new Vector2(...imgResolution) },
					uPlaneResolution: { value: new Vector2(width, height) },
					uPointerCoords: { value: new Vector2(0, 0) },
				}}
			/>
		</mesh>
	);
}

useTexture.preload("/assets/ColorBoost/japan.jpg");
useTexture.preload("/assets/checker.jpg");
