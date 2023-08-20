import Link from "next/link";

type Props = {
	headline: string;
	description: string;
	link: string;
	tags?: string[];
};

export default function FeatureCard({
	headline,
	description,
	link,
	tags,
}: Props) {
	return (
		<Link
			href={link}
			className="border block border-solid border-blue-950 p-4 rounded-lg after:content-[''] relative overflow-hidden after:w-full after:h-full after:absolute after:bg-blue-950 after:top-0 after:left-0 after:opacity-0 hover:after:opacity-100 after:-z-10 transition-colors duration-300 hover:text-white after:transition-all after:duration-300"
		>
			<h3 className="font-semibold">{headline}</h3>

			{tags && tags.length && (
				<ul className="flex gap-2 flex-wrap mt-2 mb-4">
					{tags.map((tag) => (
						<li
							className="bg-gray-400 px-2 py-1 text-white font-light text-xs rounded-full"
							key={tag}
						>
							{tag}
						</li>
					))}
				</ul>
			)}

			<p>{description}</p>
		</Link>
	);
}
