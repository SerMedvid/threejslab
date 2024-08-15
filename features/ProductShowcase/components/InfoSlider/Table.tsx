import Column from "./Column";
import Row from "./Row";
import SimpleCenter from "./SimpleCenter";
import { WorktopModel } from "../Models/Worktop";
import { CouchCapsuleModel } from "../Models/CouchCapsule";
import { CouchCakeModel } from "../Models/CouchCake";
import { PurifierModel } from "../Models/Purifier";
import { GardenChairModel } from "../Models/GardenChair";
import { BouncyTopModel } from "../Models/BouncyTop";
import { PlantModel } from "../Models/Plant";
import { GardenThingModel } from "../Models/GardenThing";
import { GardenLighModel } from "../Models/GardenLigh";

// type Props = {
// 	View: typeof ViewType;
// };

const data = [
	[
		{
			name: "Worktop",
			dimensions: "110x110",
			view: (
				<SimpleCenter>
					<WorktopModel />
				</SimpleCenter>
			),
		},
		{
			name: "Couch capsule",
			dimensions: "110x110",
			view: (
				<SimpleCenter>
					<CouchCapsuleModel />
				</SimpleCenter>
			),
		},
		{
			name: "Couch cake",
			dimensions: "110x110",
			view: (
				<SimpleCenter>
					<CouchCakeModel />
				</SimpleCenter>
			),
		},
	],
	[
		{
			name: "Purifier 02",
			dimensions: "110x110",
			view: (
				<SimpleCenter>
					<PurifierModel />
				</SimpleCenter>
			),
		},
		{
			name: "Copse combo",
			dimensions: "110x110",
			view: (
				<SimpleCenter>
					<GardenChairModel />
				</SimpleCenter>
			),
		},
		{
			name: "Bouncy prop",
			dimensions: "110x110",
			view: (
				<SimpleCenter>
					<BouncyTopModel />
				</SimpleCenter>
			),
		},
	],
	[
		{
			name: "Herbs pods",
			dimensions: "110x110",
			view: (
				<SimpleCenter>
					<PlantModel />
				</SimpleCenter>
			),
		},
		{
			name: "Garden pack",
			dimensions: "110x110",
			view: (
				<SimpleCenter>
					<GardenThingModel />
				</SimpleCenter>
			),
		},
		{
			name: "Outdoor light",
			dimensions: "110x110",
			view: (
				<SimpleCenter>
					<GardenLighModel />
				</SimpleCenter>
			),
		},
	],
];

export default function Table() {
	return (
		<div>
			<div className="mb-8 flex justify-between uppercase text-sm text-slate-700">
				<h3>Product</h3>
				<h3>NO</h3>
			</div>

			<div className="relative w-full">
				<div className="absolute w-full [&>*:nth-child(odd)]w-screen [&>*:nth-child(odd)]:after:content-[''] [&>*:nth-child(odd)]:after:h-full [&>*:nth-child(odd)]:after:w-screen [&>*:nth-child(odd)]:after:bg-slate-100 [&>*:nth-child(odd)]:after:absolute [&>*:nth-child(odd)]:after:-z-10 [&>*:nth-child(odd)]:after:-right-10">
					{Array.from({ length: data.length }).map((_, idx) => (
						<div
							key={idx}
							className="h-32 relative"
						/>
					))}
				</div>

				<div className="overflow-hidden">
					<div className="w-[300%] flex">
						{data.map((column, idx) => (
							<Column
								slide={idx}
								key={idx}
							>
								{column.map((row, idx) => (
									<Row
										key={idx}
										{...row}
									/>
								))}
							</Column>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
