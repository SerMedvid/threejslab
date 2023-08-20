import { useMemo } from "react";
import { PlaneModel } from "./PlaneModel";

type Props = {
	count: number;
};

export default function Planes({ count }: Props) {
	const planes = useMemo(() => {
		return [...Array(count)].map((_, idx) => (
			<PlaneModel
				key={idx}
				position={[0, 10.5 + Math.random(), 0]}
			/>
		));
	}, [count]);

	return planes;
}
