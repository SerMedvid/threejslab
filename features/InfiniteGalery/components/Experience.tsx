"use client";

import React, { useMemo } from "react";
import data from "../data";
import Model from "./Model";
import { PlaneGeometry } from "three";
import Overlay from "./Overlay";
import BackroundBlocks from "./BackroundBlocks";

export default function Experience() {
	const planeGeometry = useMemo(() => {
		return new PlaneGeometry(1, 1, 50, 100);
	}, []);

	const medias = useMemo(() => {
		return data.map((media, idx) => {
			return (
				<Model
					key={idx}
					geometry={planeGeometry}
					img={media.src}
					text={media.text}
					index={idx}
					lenght={data.length}
				/>
			);
		});
	}, [planeGeometry]);

	return (
		<>
			<color
				args={[0.79607843137, 0.79215686274, 0.74117647058]}
				attach={"background"}
			/>

			<Overlay />
			<BackroundBlocks />
			{medias}
		</>
	);
}
