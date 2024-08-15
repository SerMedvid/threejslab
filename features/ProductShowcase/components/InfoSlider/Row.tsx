import { View, ViewProps } from "@react-three/drei";
import React, { use, useEffect, useRef } from "react";
import { Group, Object3DEventMap } from "three";
import useStore from "../../stores/useStore";

type Props = {
	name: string;
	dimensions: string;
	view: React.ReactNode;
};

export default function Row({ name, dimensions, view }: Props) {
	const ref = useRef<Group<Object3DEventMap>>(null);

	return (
		<div className="flex justify-between items-center gap-x-10 font-medium">
			<h3 className="flex-auto ">{name}</h3>
			<p>{dimensions}</p>
			<View
				ref={ref}
				className="w-32 h-32"
			>
				{view}
			</View>
			<button className="text-2xl">+</button>
		</div>
	);
}
