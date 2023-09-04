"use client";

import CanvasWrapper from "@/components/CanvasWrapper";
import Expirience from "./Expirience";
import { useState } from "react";
import Select from "react-select";

import vertexShader from "../shaders/vertex.glsl";
import Preview from "./Preview";

import fragOptions from "../data/fragmentOptions";

const DEFAULT_FRAG_OPTION = fragOptions[0];

const DEFAULT_VERTEX_OPTION = {
	label: "Vertex 1",
	shader: vertexShader,
	value: 1,
};

export default function Layout() {
	const [vertexOption] = useState(DEFAULT_VERTEX_OPTION);
	const [fragOption, setFragOption] = useState(DEFAULT_FRAG_OPTION);

	const { shader: frag } = fragOption;
	const { shader: vertex } = vertexOption;

	return (
		<div className="flex flex-col h-full lg:flex-row-reverse bg-black ">
			<div className="min-w-[400px] py-8 px-10">
				<Select
					isMulti={false}
					options={fragOptions}
					value={fragOption}
					onChange={(val) => setFragOption(val || DEFAULT_FRAG_OPTION)}
					theme={(theme) => ({
						...theme,
						colors: {
							...theme.colors,
							primary: "#172554",
						},
					})}
				/>
				<div className="mt-4 ">
					<Preview shader={frag} />
				</div>
			</div>
			<CanvasWrapper
				withPerf={false}
				className="w-full relative"
				camera={{
					fov: 45,
					far: 20,
					near: 0.1,
					position: [0.75, -0.5, 2],
				}}
			>
				<Expirience
					fragment={frag}
					vertex={vertex}
				/>
			</CanvasWrapper>
		</div>
	);
}
