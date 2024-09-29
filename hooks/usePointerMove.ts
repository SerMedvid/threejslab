import { useThree } from "@react-three/fiber";
import { useEventListener } from "ahooks";
import { useCallback, useRef } from "react";

type Props = {
	onMove?: (moveX: number) => void;
	onEnd?: () => void;
	onStart?: () => void;
};

const calculatePoint = (
	offsetX: number,
	containerWidth: number,
	viewportWidth: number
) => {
	return (offsetX / containerWidth) * viewportWidth - viewportWidth / 2;
};

export const usePointerMove = ({ onMove, onEnd, onStart }: Props = {}) => {
	const isPressed = useRef(false);
	const target = useRef(0);
	const current = useRef(0);

	const { canvas, viewportWidth, sizeWidth } = useThree((state) => ({
		canvas: state.gl.domElement,
		viewportWidth: state.viewport.width,
		sizeWidth: state.size.width,
	}));

	const onPointerDown = useCallback(
		(evt: PointerEvent) => {
			isPressed.current = true;

			current.current = target.current = calculatePoint(
				evt.clientX,
				sizeWidth,
				viewportWidth
			);

			if (onStart) {
				onStart();
			}
		},
		[sizeWidth, viewportWidth, onStart]
	);

	const onPointerMove = useCallback(
		(evt: PointerEvent) => {
			if (isPressed.current && onMove) {
				target.current = calculatePoint(evt.clientX, sizeWidth, viewportWidth);

				onMove(target.current - current.current);

				current.current = target.current;
			}
		},
		[onMove, sizeWidth, viewportWidth]
	);

	const onPointerEnd = useCallback(() => {
		isPressed.current = false;

		if (onEnd) {
			onEnd();
		}
	}, [onEnd]);

	useEventListener("pointerdown", onPointerDown, { target: canvas });

	useEventListener("pointermove", onPointerMove, { target: canvas });

	useEventListener("pointerleave", onPointerEnd, { target: canvas });

	useEventListener("pointerup", onPointerEnd, { target: canvas });
};
