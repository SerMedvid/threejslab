import Link from "next/link";

export default async function Home() {
	return (
		<main className="flex min-h-screen flex-col  p-24">
			<h1 className="text-4xl font-extrabold mb-8 text-center">
				Welcome to my ThreeJS playgound by
				<span className="text-orange-700 underline block">
					<a
						href={"https://www.linkedin.com/in/sergii-medvid/"}
						target="_blank"
					>
						Sergii Medvid
					</a>
				</span>
			</h1>

			<h2 className="text-3xl font-bold mt-12 mb-4 ">List of Experiences</h2>
			<ul className="justify-self-start ">
				<li>
					<Link href={"/lab/earth-day-and-night"}>Day/Night Earth</Link>
				</li>
			</ul>
		</main>
	);
}
