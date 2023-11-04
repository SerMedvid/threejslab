import {
	Float,
	OrbitControls,
	PerspectiveCamera as PerspectiveCameraDrei,
	useScroll,
} from "@react-three/drei";
import Background from "./Background";
import Airplane from "./Airplane";
import Cloud from "./Cloud";
import { memo, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import {
	CatmullRomCurve3,
	Euler,
	Group,
	MathUtils,
	MeshStandardMaterial,
	PerspectiveCamera,
	Quaternion,
	Shape,
	Vector3,
} from "three";
import { useFrame } from "@react-three/fiber";
import TextSection from "./TextSection";
import gsap from "gsap";
import { fadeOnBeforeCompile } from "../utils/fadeMaterial";
import useStore from "../stores/useStore";
import Speed from "./Speed";

const LINE_NUMBER_POINTS = 1000;
const CURVE_DISTANCE = 250;
const CURVE_AHEAD_CAMERA = 0.008;
const CURVE_AHEAD_AIRPLANE = 0.02;
const AIRPLANE_MAX_ANGLE = 35;
const FRICTION_DISTANCE = 42;

const curvePoints = [
	new Vector3(0, 0, 0 * CURVE_DISTANCE),
	new Vector3(0, 0, -1 * CURVE_DISTANCE),
	new Vector3(100, 0, -2 * CURVE_DISTANCE),
	new Vector3(-100, 0, -3 * CURVE_DISTANCE),
	new Vector3(100, 0, -4 * CURVE_DISTANCE),
	new Vector3(0, 0, -5 * CURVE_DISTANCE),
	new Vector3(0, 0, -6 * CURVE_DISTANCE),
	new Vector3(0, 0, -7 * CURVE_DISTANCE),
];

const curve = new CatmullRomCurve3(curvePoints, false, "catmullrom", 0.5);

const textSections = [
	{
		position: new Vector3(
			curvePoints[1].x - 3,
			curvePoints[1].y,
			curvePoints[1].z
		),
		subtitle: `Welcome to Atmos, Have a seat ant enjoy the ride!`,
		cameraRailDist: -1,
	},
	{
		position: new Vector3(
			curvePoints[2].x + 2,
			curvePoints[2].y,
			curvePoints[2].z
		),
		title: "Services",
		subtitle: `The largest bar at your service`,
		cameraRailDist: 1.5,
	},
	{
		position: new Vector3(
			curvePoints[3].x - 3,
			curvePoints[3].y,
			curvePoints[3].z
		),
		title: "Fear of flying?",
		subtitle: `Our flight attendants will help you have a great journey`,
		cameraRailDist: -1,
	},
];

const clouds = [
	{
		position: new Vector3(-3.5, -3.2, -7),
	},
	{
		position: new Vector3(3.5, -4, -10),
	},
	{
		scale: new Vector3(4, 4, 4),
		position: new Vector3(-18, 0.2, -68),
		rotation: new Euler(-Math.PI / 5, Math.PI / 6, 0),
	},
	{
		scale: new Vector3(2.5, 2.5, 2.5),
		position: new Vector3(10, -1.2, -52),
	},
	// FIRST POINT
	{
		scale: new Vector3(4, 4, 4),
		position: new Vector3(
			curvePoints[1].x + 10,
			curvePoints[1].y - 4,
			curvePoints[1].z + 64
		),
	},
	{
		scale: new Vector3(3, 3, 3),
		position: new Vector3(
			curvePoints[1].x - 20,
			curvePoints[1].y + 4,
			curvePoints[1].z + 28
		),
		rotation: new Euler(0, Math.PI / 7, 0),
	},
	{
		rotation: new Euler(0, Math.PI / 7, Math.PI / 5),
		scale: new Vector3(5, 5, 5),
		position: new Vector3(
			curvePoints[1].x - 13,
			curvePoints[1].y + 4,
			curvePoints[1].z - 62
		),
	},
	{
		rotation: new Euler(Math.PI / 2, Math.PI / 2, Math.PI / 3),
		scale: new Vector3(5, 5, 5),
		position: new Vector3(
			curvePoints[1].x + 54,
			curvePoints[1].y + 2,
			curvePoints[1].z - 82
		),
	},
	{
		scale: new Vector3(5, 5, 5),
		position: new Vector3(
			curvePoints[1].x + 8,
			curvePoints[1].y - 14,
			curvePoints[1].z - 22
		),
	},
	// SECOND POINT
	{
		scale: new Vector3(3, 3, 3),
		position: new Vector3(
			curvePoints[2].x + 6,
			curvePoints[2].y - 7,
			curvePoints[2].z + 50
		),
	},
	{
		scale: new Vector3(2, 2, 2),
		position: new Vector3(
			curvePoints[2].x - 2,
			curvePoints[2].y + 4,
			curvePoints[2].z - 26
		),
	},
	{
		scale: new Vector3(4, 4, 4),
		position: new Vector3(
			curvePoints[2].x + 12,
			curvePoints[2].y + 1,
			curvePoints[2].z - 86
		),
		rotation: new Euler(Math.PI / 4, 0, Math.PI / 3),
	},
	// THIRD POINT
	{
		scale: new Vector3(3, 3, 3),
		position: new Vector3(
			curvePoints[3].x + 3,
			curvePoints[3].y - 10,
			curvePoints[3].z + 50
		),
	},
	{
		scale: new Vector3(3, 3, 3),
		position: new Vector3(
			curvePoints[3].x - 10,
			curvePoints[3].y,
			curvePoints[3].z + 30
		),
		rotation: new Euler(Math.PI / 4, 0, Math.PI / 5),
	},
	{
		scale: new Vector3(4, 4, 4),
		position: new Vector3(
			curvePoints[3].x - 20,
			curvePoints[3].y - 5,
			curvePoints[3].z - 8
		),
		rotation: new Euler(Math.PI, 0, Math.PI / 5),
	},
	{
		scale: new Vector3(5, 5, 5),
		position: new Vector3(
			curvePoints[3].x + 0,
			curvePoints[3].y - 5,
			curvePoints[3].z - 98
		),
		rotation: new Euler(0, Math.PI / 3, 0),
	},
	// FOURTH POINT
	{
		scale: new Vector3(2, 2, 2),
		position: new Vector3(
			curvePoints[4].x + 3,
			curvePoints[4].y - 10,
			curvePoints[4].z + 2
		),
	},
	{
		scale: new Vector3(3, 3, 3),
		position: new Vector3(
			curvePoints[4].x + 24,
			curvePoints[4].y - 6,
			curvePoints[4].z - 42
		),
		rotation: new Euler(Math.PI / 4, 0, Math.PI / 5),
	},
	{
		scale: new Vector3(3, 3, 3),
		position: new Vector3(
			curvePoints[4].x - 4,
			curvePoints[4].y + 9,
			curvePoints[4].z - 62
		),
		rotation: new Euler(Math.PI / 3, 0, Math.PI / 3),
	},
	// FINAL
	{
		scale: new Vector3(3, 3, 3),
		position: new Vector3(
			curvePoints[7].x + 12,
			curvePoints[7].y - 5,
			curvePoints[7].z + 60
		),
		rotation: new Euler(-Math.PI / 4, -Math.PI / 6, 0),
	},
	{
		scale: new Vector3(3, 3, 3),
		position: new Vector3(
			curvePoints[7].x - 12,
			curvePoints[7].y + 5,
			curvePoints[7].z + 120
		),
		rotation: new Euler(Math.PI / 4, Math.PI / 6, 0),
	},
];

export const Experience = () => {
	const play = useStore((store) => store.play);
	const end = useStore((store) => store.end);
	const setScrolled = useStore((store) => store.setScrolled);
	const setEnd = useStore((store) => store.setEnd);

	const shape = useMemo(() => {
		const shape = new Shape();
		shape.moveTo(0, -0.08);
		shape.lineTo(0, 0.08);

		return shape;
	}, []);

	const cameraGroup = useRef<Group>(null);
	const cameraRail = useRef<Group>(null);
	const cameraRef = useRef<PerspectiveCamera>(null);
	const airplaneRef = useRef<Group>(null);
	const lastScroll = useRef(0);
	const timeline = useRef<gsap.core.Timeline>();
	const backgroundColors = useRef({
		colorA: "#3535cc",
		colorB: "#abaadd",
	});
	const sceneOpacity = useRef(0);
	const lineMaterialRef = useRef<MeshStandardMaterial>(null);
	const planeInTl = useRef<gsap.core.Timeline>();
	const planeOutTl = useRef<gsap.core.Timeline>();

	const scroll = useScroll();

	useLayoutEffect(() => {
		timeline.current = gsap.timeline();
		timeline.current
			.to(backgroundColors.current, {
				duration: 1,
				colorA: "#6f35cc",
				colorB: "#ffad30",
			})
			.to(backgroundColors.current, {
				duration: 1,
				colorA: "#424242",
				colorB: "#ffcc00",
			})
			.to(backgroundColors.current, {
				duration: 1,
				colorA: "#81318b",
				colorB: "#55ab8f",
			});

		timeline.current.pause();

		if (airplaneRef.current) {
			planeInTl.current = gsap.timeline();
			planeInTl.current.pause();
			planeInTl.current.from(airplaneRef.current.position, {
				duration: 3,
				z: 5,
				y: -2,
			});
		}

		if (airplaneRef.current && cameraRail.current) {
			planeOutTl.current = gsap.timeline();
			planeOutTl.current.pause();

			planeOutTl.current
				.to(
					airplaneRef.current.position,
					{
						duration: 10,
						z: -250,
						y: 10,
					},
					0
				)
				.to(
					cameraRail.current.position,
					{
						duration: 8,
						y: 12,
					},
					0
				)
				.to(airplaneRef.current.position, {
					duration: 1,
					z: -1000,
				});
		}
	}, []);

	useEffect(() => {
		if (play && !end) planeInTl.current?.play();
	}, [play, end]);

	useFrame((_, delta) => {
		if (scroll.offset > 0) {
			setScrolled(true);
		}

		if (cameraRef.current) {
			if (window.innerHeight > window.innerWidth) {
				cameraRef.current.fov = 80;
				cameraRef.current.position.z = 2;
			} else {
				cameraRef.current.fov = 30;
				cameraRef.current.position.z = 5;
			}
		}

		if (!cameraGroup.current || !airplaneRef.current) return;

		if (play && !end && sceneOpacity.current < 1) {
			sceneOpacity.current = MathUtils.lerp(
				sceneOpacity.current,
				1,
				delta * 0.1
			);
		}

		if (end && sceneOpacity.current > 0) {
			sceneOpacity.current = MathUtils.lerp(sceneOpacity.current, 0, delta);
		}

		if (lineMaterialRef.current) {
			lineMaterialRef.current.opacity = sceneOpacity.current;
		}

		if (end) {
			return;
		}

		const scrollOffset = Math.max(0, scroll.offset);

		let resetCameraRail = true;
		let friction = 1;

		// Look to close text sections
		textSections.forEach((textSection) => {
			const distance = textSection.position.distanceTo(
				(cameraGroup.current as Group).position
			);

			if (distance < FRICTION_DISTANCE) {
				friction = Math.max(distance / FRICTION_DISTANCE, 0.1);
				const targetCameraRailPosition = new Vector3(
					(1 - distance / FRICTION_DISTANCE) * textSection.cameraRailDist,
					0,
					0
				);
				cameraRail.current?.position.lerp(targetCameraRailPosition, delta);
				resetCameraRail = false;
			}
		});

		if (resetCameraRail) {
			cameraRail.current?.position.lerp(new Vector3(0, 0, 0), delta);
		}

		//Calculate lerped scroll offset
		let lerpedScrollOffset = MathUtils.lerp(
			lastScroll.current,
			scrollOffset,
			delta * friction
		);

		lerpedScrollOffset = Math.max(Math.min(lerpedScrollOffset, 1), 0);
		lastScroll.current = lerpedScrollOffset;
		timeline.current?.seek(lerpedScrollOffset * timeline.current.duration());

		const curPoint = curve.getPoint(lerpedScrollOffset);

		// Follow the curve points
		cameraGroup.current.position.lerp(curPoint, delta * 24);

		const lookAtPoint = curve.getPoint(
			Math.min(lerpedScrollOffset + CURVE_AHEAD_CAMERA, 1)
		);

		const currentLookAt = cameraGroup.current?.getWorldDirection(new Vector3());

		const targetLookAt = new Vector3()
			.subVectors(curPoint, lookAtPoint)
			.normalize();

		const lookAt = currentLookAt?.lerp(targetLookAt, delta * 24);

		cameraGroup.current?.lookAt(
			cameraGroup.current.position.clone().add(lookAt as Vector3)
		);

		// Airplane rotation

		const tangent = curve.getTangent(lerpedScrollOffset + CURVE_AHEAD_AIRPLANE);

		const nonLerpLookAt = new Group();
		nonLerpLookAt.position.copy(curPoint);
		nonLerpLookAt.lookAt(nonLerpLookAt.position.clone().add(tangent));

		tangent.applyAxisAngle(new Vector3(0, 1, 0), -nonLerpLookAt.rotation.y);

		let angle = Math.atan2(-tangent.z, tangent.x);
		angle = -Math.PI / 2 + angle;

		let angleDegrees = (angle * 180) / Math.PI;
		angleDegrees *= 2.4; // stronger angle

		// Limit plane angle
		if (angleDegrees < 0) {
			angleDegrees = Math.max(angleDegrees, -AIRPLANE_MAX_ANGLE);
		}
		if (angleDegrees > 0) {
			angleDegrees = Math.min(angleDegrees, AIRPLANE_MAX_ANGLE);
		}

		angle = (angleDegrees * Math.PI) / 180;

		const targetAirplaneQuaternion = new Quaternion().setFromEuler(
			new Euler(
				airplaneRef.current?.rotation.x,
				airplaneRef.current?.rotation.y,
				angle
			)
		);

		airplaneRef.current?.quaternion.slerp(targetAirplaneQuaternion, delta * 2);

		if (
			cameraGroup.current.position.z <
			curvePoints[curvePoints.length - 1].z + 100
		) {
			setEnd(true);
			planeOutTl.current?.play();
		}
	});

	return (
		<>
			{/* <OrbitControls enableZoom={false} /> */}
			<directionalLight
				position={[0, 3, 1]}
				intensity={0.1}
			/>

			<group ref={cameraGroup}>
				<Speed />
				<Background backgroundColors={backgroundColors} />
				<group ref={cameraRail}>
					<PerspectiveCameraDrei
						fov={30}
						position={[0, 0, 5]}
						makeDefault
						ref={cameraRef}
					/>
				</group>

				<group ref={airplaneRef}>
					<Float
						floatIntensity={1}
						speed={1.5}
						rotationIntensity={0.5}
					>
						<Airplane
							rotation-y={Math.PI / 2}
							scale={[0.2, 0.2, 0.2]}
							position-y={0.1}
						/>
					</Float>
				</group>
			</group>

			{textSections.map((textSection, index) => (
				<TextSection
					{...textSection}
					key={index}
				/>
			))}

			{/* Line */}
			<group position-y={-2}>
				<mesh>
					<extrudeGeometry
						args={[
							shape,
							{
								steps: LINE_NUMBER_POINTS,
								bevelEnabled: true,
								extrudePath: curve,
							},
						]}
					/>
					<meshStandardMaterial
						color={"white"}
						ref={lineMaterialRef}
						transparent
						envMapIntensity={2}
						onBeforeCompile={fadeOnBeforeCompile}
					/>
				</mesh>
			</group>

			{clouds.map((cloud, idx) => (
				<Cloud
					{...cloud}
					sceneOpacity={sceneOpacity}
					key={idx}
				/>
			))}
		</>
	);
};

export default memo(Experience);
