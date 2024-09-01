type Props = {
	name: string;
	href: string;
};

export default function Credits({ name, href }: Props) {
	return (
		<p className="fixed bottom-6 right-6 text-sm">
			{"Design credits: "}
			<a
				className="underline"
				href={href}
			>
				{name}
			</a>
		</p>
	);
}
