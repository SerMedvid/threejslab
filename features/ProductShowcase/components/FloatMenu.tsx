import ArrowIcon from "./Icons/ArrowIcon";
import PenIcon from "./Icons/PenIcon";
import RulerIcon from "./RulerIcon";
import WorkerIcon from "./Icons/WorkerIcon";
import useStore from "../stores/useStore";

export default function FloatMenu() {
	const setNextTick = useStore((state) => state.setNextTick);

	return (
		<div className="fixed z-20 rounded-full bg-white flex left-1/2 bottom-14 gap-x-6 items-center px-6 py-4 -translate-x-1/2">
			<ul className="flex relative gap-x-6 pr-4 after:absolute after:w-[1px] after:h-[120%] after:bg-slate-400 after:right-0 after:top-1/2 after:-translate-y-1/2">
				<li>
					<RulerIcon />
				</li>
				<li>
					<PenIcon />
				</li>
				<li>
					<WorkerIcon />
				</li>
			</ul>
			<div>
				<button
					className="rounded-2xl bg-slate-900 p-3 "
					onClick={setNextTick}
				>
					<ArrowIcon />
				</button>
			</div>
		</div>
	);
}
