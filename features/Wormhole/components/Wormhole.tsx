import { useMemo } from "react";
import { CatmullRomCurve3, TubeGeometry } from "three";

type Props = {
	motionPath: CatmullRomCurve3;
};

export default function Wormhole({ motionPath }: Props) {
	const tubeGeometry = useMemo(
		() => new TubeGeometry(motionPath, 222, 0.65, 16, true),
		[motionPath]
	);

	return (
		<lineSegments>
			<edgesGeometry args={[tubeGeometry, 0.25]} />

			<lineBasicMaterial color={"#109be6"} />
		</lineSegments>
	);
}
