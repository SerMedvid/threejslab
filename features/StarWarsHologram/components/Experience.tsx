import { OrbitControls, Stars } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import { HologramMaterial } from "@/components/materials/Hologram";
import { StarWarsScene } from "./StarWarsScene";
import { Leva } from "leva";

extend({ HologramMaterial });

export default function Experience() {
	return (
		<>
			<color
				args={["#343140"]}
				attach={"background"}
			/>

			<OrbitControls />

			<StarWarsScene />

			<Leva hidden />

			<Stars
				radius={100}
				depth={50}
				count={5000}
				factor={4}
				saturation={0}
				fade
				speed={1}
			/>
		</>
	);
}
