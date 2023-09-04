import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

type Props = {
	shader: string;
};

export default function Preview({ shader }: Props) {
	return (
		<SyntaxHighlighter
			language="glsl"
			style={atomOneDark}
			wrapLongLines
			customStyle={{
				overflowX: "hidden",
			}}
		>
			{shader}
		</SyntaxHighlighter>
	);
}
