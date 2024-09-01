"use client";

import CanvasWrapper from "@/components/CanvasWrapper";
import { View } from "@react-three/drei";
import FloatMenu from "./FloatMenu";
import MainSliderRenderer from "./Main3DSlider/MainSliderRenderer";
import { LinearSRGBColorSpace } from "three";
import Table from "./InfoSlider/Table";
import Credits from "@/components/Credits";

export default function Layout() {
	return (
		<>
			<CanvasWrapper
				withPerf={false}
				gl={{
					outputColorSpace: LinearSRGBColorSpace,
				}}
			>
				<View.Port />
			</CanvasWrapper>
			<div className="overflow-x-hidden">
				<div className=" grid-cols-5 min-h-[100svh] relative md:grid">
					<View className="left-0 -top-0 w-full h-[100svh] md:h-full md:w-[65%] md:absolute">
						<MainSliderRenderer />
					</View>

					<div className="col-start-4 col-span-2 pl-4 pr-10 pt-5 pb-20 self-end">
						<h2 className="text-3xl flex flex-col mb-14 md:text-6xl">
							<span>My</span>
							<span>storehouse</span>
						</h2>

						<Table />
					</div>
				</div>

				<FloatMenu />
			</div>

			<Credits
				name="Cosmin Capitanu"
				href="https://dribbble.com/shots/16460483-Cake-Couch"
			/>
		</>
	);
}
