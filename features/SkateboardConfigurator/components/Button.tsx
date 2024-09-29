import { ReactNode } from "react";

type Props = {
	onClick: () => void;
	children: ReactNode;
	disabled?: boolean;
};

export default function Button({ onClick, disabled, children }: Props) {
	return (
		<button
			className="bg-black rounded-full px-10 py-3 text-white"
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
}
