import { Line } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { useReducer } from "react";
import { AdditiveBlending, Color, Points, Vector3 } from "three";

type Props = {
	pointsRef: React.MutableRefObject<Points | null>;
};

type State = {
	segmentPoints: Vector3[] | null;
	segmentColors: Color[] | null;
};

type Action =
	| { type: "setSegmentPoints"; payload: Vector3[] }
	| { type: "setSegmentColors"; payload: Color[] }
	| {
			type: "setSegmentData";
			payload: {
				segmentPoints: Vector3[];
				segmentColors: Color[];
			};
	  };

const pointVector = new Vector3();
const colorVector = new Color();

const initState: State = {
	segmentPoints: null,
	segmentColors: null,
};

const reducer = (state: State, action: Action) => {
	switch (action.type) {
		case "setSegmentPoints":
			return { ...state, segmentPoints: action.payload };
		case "setSegmentColors":
			return { ...state, segmentColors: action.payload };
		case "setSegmentData":
			return {
				...state,
				segmentPoints: action.payload.segmentPoints,
				segmentColors: action.payload.segmentColors,
			};
		default:
			return state;
	}
};

export default function ConnectionLines({ pointsRef }: Props) {
	const [{ segmentPoints, segmentColors }, dispatch] = useReducer(
		reducer,
		initState
	);

	const { width } = useThree((state) => state.viewport);

	const { connectionDistance, lineWidth } = useControls({
		connectionDistance: { value: 1.5, min: 0.1, max: 5, step: 0.1 },
		lineWidth: { value: 2, min: 0.1, max: 5, step: 0.1 },
	});

	useFrame(() => {
		if (pointsRef.current) {
			const count = pointsRef.current.geometry.attributes.position.count;
			const positionArray =
				pointsRef.current.geometry.attributes.position.array;

			const points = [];
			const colors = [];

			for (let i = 0; i < count; i++) {
				const i3 = i * 3;

				const x = positionArray[i3];
				const y = positionArray[i3 + 1];
				const z = positionArray[i3 + 2] - 0.01;

				const point1 = pointVector.clone().set(x, y, z);

				for (let j = i + 1; j < count; j++) {
					const j3 = j * 3;
					const x2 = positionArray[j3];
					const y2 = positionArray[j3 + 1];
					const z2 = positionArray[j3 + 2] - 0.01;

					const point2 = pointVector.clone().set(x2, y2, z2);

					const distance = point1.distanceTo(point2);

					if (distance < connectionDistance && i !== j) {
						points.push(point1, point2);
						colors.push(
							colorVector.clone().setHSL((x + width / 2) / width, 0.85, 0.5),
							colorVector.clone().setHSL((x2 + width / 2) / width, 0.85, 0.5)
						);
					}
				}
			}

			if (points.length) {
				dispatch({
					type: "setSegmentData",
					payload: { segmentPoints: points, segmentColors: colors },
				});
			}
		}
	});

	if (!segmentPoints || !segmentColors) return null;

	return (
		<Line
			key={`${connectionDistance}`}
			points={segmentPoints}
			segments
			transparent
			vertexColors={segmentColors}
			lineWidth={lineWidth}
			blending={AdditiveBlending}
			depthTest={false}
			onBeforeCompile={(shader) => {
				shader.fragmentShader = shader.fragmentShader.replace(
					"void main() {",
					`
                    varying float vSegmentDistance;

                    void main() {`
				);

				shader.fragmentShader = shader.fragmentShader.replace(
					"gl_FragColor = diffuseColor;",
					`diffuseColor.a = 1. - vSegmentDistance / ${connectionDistance}${
						Number.isInteger(connectionDistance) ? "." : ""
					};
                    gl_FragColor = diffuseColor;`
				);

				shader.vertexShader = shader.vertexShader.replace(
					"void main() {",
					`
                    varying float vSegmentDistance;

                    void main() {`
				);

				shader.vertexShader = shader.vertexShader.replace(
					"gl_Position = clip;",
					`
                    gl_Position = clip;
                    vSegmentDistance = distance(start, end);
                    `
				);

				return shader;
			}}
		></Line>
	);
}
