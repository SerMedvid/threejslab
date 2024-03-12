import { OrbitControls } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import {
	HologramMaterial,
	HologramMaterialT,
} from "@/components/materials/Hologram";
import Model from "./Model";

extend({ HologramMaterial });

export default function Experience() {
	return (
		<>
			<color
				args={["#343140"]}
				attach={"background"}
			/>

			<OrbitControls />

			<Model />
		</>
	);
}
