import {
	Environment,
	MeshPortalMaterial,
	RoundedBox,
	Text,
	useTexture,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { ElementRef, useEffect, useRef } from "react";
import { BackSide, Color, DoubleSide } from "three";
import useStore from "../store/useStore";
import { easing } from "maath";

type Props = JSX.IntrinsicElements["group"] & {
	mapUrl: string;
	children: React.ReactNode;
	name: string;
	color: string | Color;
};

export default function Portal({
	mapUrl,
	children,
	name,
	color,
	...rest
}: Props) {
	const map = useTexture(mapUrl);

	const setActive = useStore((state) => state.setActive);
	const setHovered = useStore((state) => state.setHovered);

	const portalRef = useRef<ElementRef<typeof MeshPortalMaterial>>(null);
	const worldOpenRef = useRef(false);

	useEffect(() => {
		useStore.subscribe(
			(store) => store.active,
			(val) => {
				if (portalRef.current) {
					worldOpenRef.current = name === val;
				}
			}
		);
	}, [name]);

	useFrame((_, delta) => {
		if (portalRef.current) {
			easing.damp(
				portalRef.current,
				"blend",
				worldOpenRef.current ? 1 : 0,
				0.2,
				delta
			);
		}
	});

	return (
		<group {...rest}>
			<Text
				fontSize={0.3}
				position={[0, -1.3, 0.051]}
				anchorY={"bottom"}
				font="/fonts/Poppins/Poppins-Black.ttf"
			>
				{name}
				<meshBasicMaterial
					color={color}
					toneMapped={false}
				/>
			</Text>
			<RoundedBox
				name={name}
				args={[2, 3, 0.1]}
				onDoubleClick={() => {
					setActive(name);
				}}
				onPointerEnter={() => setHovered(name)}
				onPointerLeave={() => setHovered(null)}
			>
				<boxGeometry args={[2, 3, 0.1]} />
				<MeshPortalMaterial
					side={DoubleSide}
					ref={portalRef}
				>
					<ambientLight intensity={0.6} />
					<Environment preset="sunset" />
					<mesh>
						<sphereGeometry args={[5, 32, 32]} />

						<meshBasicMaterial
							map={map}
							side={BackSide}
						/>
					</mesh>

					{children}
				</MeshPortalMaterial>
			</RoundedBox>
		</group>
	);
}
