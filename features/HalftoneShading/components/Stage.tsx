import React from "react";
import { GwenModel } from "./GwenModel";
import { Environment } from "@react-three/drei";
import { ShaderMaterial } from "three";

type Props = {
	shaderMaterial?: ShaderMaterial;
	bgColor: string;
};

export default function Stage({ shaderMaterial, bgColor }: Props) {
	return (
		<>
			<GwenModel
				shaderMaterial={shaderMaterial}
				position-y={-2}
			/>

			{!shaderMaterial && <Environment preset="dawn" />}
		</>
	);
}
