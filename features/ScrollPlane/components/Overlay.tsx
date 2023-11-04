import { useProgress } from "@react-three/drei";
import useStore from "../stores/useStore";

export default function Overlay() {
	const { progress } = useProgress();
	const isLoaded = progress === 100;

	const { play, end, setPlay, scrolled } = useStore();

	return (
		<div
			className={`absolute top-0 left-0 right-0 bottom-0 ${
				play ? "pointer-events-none" : ""
			}`}
		>
			<div
				className={`absolute top-0 left-0 bottom-0 right-0 bg-white transition-opacity duration-[2000ms] ease-in-out ${
					isLoaded ? "opacity-0" : "opacity-100"
				}`}
			></div>

			{isLoaded && (
				<div className="flex justify-center items-center flex-col h-full">
					<h1
						className={`text-white text-5xl md:text-9xl tracking-[0.25rem] md:tracking-[0.5rem] p-0 m-0 absolute -translate-y-2/4 animate-[fadeup_2.4s_ease-in-out] transition-all duration-[2000ms] ease-in-out ${
							play
								? "top-6 md:top-[42px] scale-50 md:scale-[0.25] origin-[center top]"
								: "top-[50vh]"
						}`}
					>
						THEATMOS
						<div
							className={`absolute right-0 top-0 -mr-[42px] -mt-[42px] ${
								play
									? "animate-[fadeout_1s_ease-in-out_forwards] opacity-1"
									: "animate-[fadein_2.4s_ease-in-out_1.2s_forwards] opacity-0"
							}`}
						>
							<div className="w-20 h-20 md:w-[164px] md:h-[164px] bg-contain bg-[url('/assets/ScrollPlane/spinner.svg')] animate-[spin_10s_linear_infinite]" />
						</div>
					</h1>
					<p
						className={`opacity-0 text-white text-base absolute top-[24vh] tracking-wider ${
							play
								? scrolled
									? "animate-[fadeout_1s_ease-in-out_forwards]"
									: "animate-[fadein_1s_ease-in-out_1.5s_forwards]"
								: ""
						} `}
					>
						Scroll to begin the journey
					</p>
					<button
						className={`px-8 py-4 text-xl tracking-[0.25rem] text-blue-700 rounded-[32px] cursor-pointer inline-block mt-[320px] border-0 bg-white relative overflow-hidden duration-500 ease-in-out  opacity-0 hover:text-white hover:before:w-[200%] hover:before:h-[300%] hover:before:rounded-full before:content-[''] before:bg-blue-700 before:absolute before:w-0 before:bottom-0 before:left-1/2 before:h-0 before:duration-500 before:ease-in-out before:-translate-x-1/2 before:translate-y-1/2 before:-z-[1] ${
							play
								? "animate-[fadeout_1s_ease-in-out_forwards]"
								: "animate-[fadein_2.4s_ease-in-out_2s_forwards]"
						}`}
						onClick={() => {
							setPlay(true);
						}}
					>
						Explore
					</button>
				</div>
			)}

			<div
				className={`absolute top-0 left-0 right-0 bottom-0 h-full w-full flex items-center justify-center transition-opacity duration-[4s] ease-in-out pointer-events-none ${
					end ? "opacity-100" : "opacity-0"
				}`}
			>
				<p className="text-white md:text-2xl">
					Wish you had a great flight with us...
				</p>
			</div>
		</div>
	);
}
