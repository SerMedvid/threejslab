import useStore from "../store/useStore";
import { Mesmerized3dPage } from "../types";

export default function Ui() {
	const currentPage = useStore((state) => state.currentPage);
	const setCurrentPage = useStore((state) => state.setCurrentPage);

	return (
		<div className="fixed inset-0 pointer-events-none">
			<section
				className={`flex flex-col w-full h-full items-center justify-center duration-500 ${
					currentPage !== Mesmerized3dPage.HOME && "opacity-0"
				}`}
			>
				<div className="h-[66%]"></div>
				<button
					onClick={() => setCurrentPage(Mesmerized3dPage.STORE)}
					className="pointer-events-auto py-4 px-8 bg-orange-400 text-white font-black rounded-full hover:bg-orange-600 cursor-pointer transition-colors duration-500"
				>
					Enter
				</button>
			</section>
		</div>
	);
}
