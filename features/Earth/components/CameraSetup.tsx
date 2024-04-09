import { CameraControls } from "@react-three/drei";
import { ElementRef, forwardRef, useRef } from "react";

export const CameraSetup = forwardRef<ElementRef<typeof CameraControls>, {}>(
	(props, refForwarded) => {
		const innerRef = useRef<ElementRef<typeof CameraControls>>(null);

		const ref = refForwarded ?? innerRef;

		return (
			<CameraControls
				smoothTime={1}
				ref={ref}
			></CameraControls>
		);
	}
);

CameraSetup.displayName = "CameraSetup";

export default CameraSetup;
