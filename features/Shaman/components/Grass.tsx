import { useTexture } from "@react-three/drei";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import {
	Color,
	Mesh,
	PlaneGeometry,
	RepeatWrapping,
	Texture,
	Uniform,
	Vector3,
	Vector4,
} from "three";
import { GrassMateriallT, GrassMaterial } from "./GrassMaterial";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";

extend({ GrassMaterial });

type Props = JSX.IntrinsicElements["group"] & {
	instances?: number;
	options?: { bW: number; bH: number; joints: number };
};

export default function Grass({
	options = { bW: 0.024, bH: 0.2, joints: 5 },
	instances = 50000,
	...props
}: Props) {
	const { bW, bH, joints } = options;
	const materialRef = useRef<GrassMateriallT>(null);
	const [texture, alphaMap, perlin] = useTexture(
		[
			"/assets/Shaman/grass/blade_diffuse.jpg",
			"/assets/Shaman/grass/blade_alpha.jpg",
			"/assets/KitchenSmoke/perlin.png",
		],
		(textures) => {
			if (Array.isArray(textures) && textures[2] instanceof Texture) {
				textures[2].wrapS = RepeatWrapping;
				textures[2].wrapT = RepeatWrapping;
			}
		}
	);

	const scene = useThree((state) => state.scene);

	const attributeData = useMemo(() => {
		const surfaceMesh = scene.getObjectByName("GRASS") as Mesh;

		return getAttributeData(surfaceMesh, instances);
	}, [scene, instances]);

	const baseGeom = useMemo(
		() => new PlaneGeometry(bW, bH, 1, joints).translate(0, bH / 2, 0),
		[options]
	);

	useFrame((state) => {
		if (materialRef.current?.uniforms) {
			materialRef.current.uniforms.time.value = state.clock.elapsedTime / 8;
		}
	});

	const [startUniforms] = useState(() => ({
		bladeHeight: new Uniform(1),
		map: new Uniform(texture),
		alphaMap: new Uniform(alphaMap),
		perlinTexture: new Uniform(perlin),
		time: new Uniform(0),
		tipColor: new Uniform(new Color(0.0, 0.5, 0.0).convertSRGBToLinear()),
		bottomColor: new Uniform(new Color(0.0, 0.1, 0.0).convertSRGBToLinear()),
	}));

	return (
		<group {...props}>
			<mesh>
				<instancedBufferGeometry
					index={baseGeom.index}
					attributes-position={baseGeom.attributes.position}
					attributes-uv={baseGeom.attributes.uv}
				>
					<instancedBufferAttribute
						attach={"attributes-offset"}
						args={[new Float32Array(attributeData.offsets), 3]}
					/>
					<instancedBufferAttribute
						attach={"attributes-orientation"}
						args={[new Float32Array(attributeData.orientations), 4]}
					/>
					<instancedBufferAttribute
						attach={"attributes-stretch"}
						args={[new Float32Array(attributeData.stretches), 1]}
					/>
					<instancedBufferAttribute
						attach={"attributes-halfRootAngleSin"}
						args={[new Float32Array(attributeData.halfRootAngleSin), 1]}
					/>
					<instancedBufferAttribute
						attach={"attributes-halfRootAngleCos"}
						args={[new Float32Array(attributeData.halfRootAngleCos), 1]}
					/>
				</instancedBufferGeometry>

				<grassMaterial
					ref={materialRef}
					uniforms={{ ...startUniforms }}
					toneMapped={false}
				/>
			</mesh>
		</group>
	);
}

function getAttributeData(surfaceMesh: Mesh, instances: number) {
	const sampler = new MeshSurfaceSampler(surfaceMesh).build();

	const position = new Vector3();

	const offsets = [];
	const orientations = [];
	const stretches = [];
	const halfRootAngleSin = [];
	const halfRootAngleCos = [];

	let quaternion_0 = new Vector4();
	let quaternion_1 = new Vector4();

	//The min and max angle for the growth direction (in radians)
	const min = -0.25;
	const max = 0.25;

	//For each instance of the grass blade
	for (let i = 0; i < instances; i += 3) {
		sampler.sample(position);
		//Offset of the roots
		offsets.push(position.x, position.y, position.z);

		//Define random growth directions
		//Rotate around Y
		let angle = Math.PI - Math.random() * (2 * Math.PI);
		halfRootAngleSin.push(Math.sin(0.5 * angle));
		halfRootAngleCos.push(Math.cos(0.5 * angle));

		let RotationAxis = new Vector3(0, 1, 0);
		let x = RotationAxis.x * Math.sin(angle / 2.0);
		let y = RotationAxis.y * Math.sin(angle / 2.0);
		let z = RotationAxis.z * Math.sin(angle / 2.0);
		let w = Math.cos(angle / 2.0);
		quaternion_0.set(x, y, z, w).normalize();

		//Rotate around X
		angle = Math.random() * (max - min) + min;
		RotationAxis = new Vector3(1, 0, 0);
		x = RotationAxis.x * Math.sin(angle / 2.0);
		y = RotationAxis.y * Math.sin(angle / 2.0);
		z = RotationAxis.z * Math.sin(angle / 2.0);
		w = Math.cos(angle / 2.0);
		quaternion_1.set(x, y, z, w).normalize();

		//Combine rotations to a single quaternion
		quaternion_0 = multiplyQuaternions(quaternion_0, quaternion_1);

		//Rotate around Z
		angle = Math.random() * (max - min) + min;
		RotationAxis = new Vector3(0, 0, 1);
		x = RotationAxis.x * Math.sin(angle / 2.0);
		y = RotationAxis.y * Math.sin(angle / 2.0);
		z = RotationAxis.z * Math.sin(angle / 2.0);
		w = Math.cos(angle / 2.0);
		quaternion_1.set(x, y, z, w).normalize();

		//Combine rotations to a single quaternion
		quaternion_0 = multiplyQuaternions(quaternion_0, quaternion_1);

		orientations.push(
			quaternion_0.x,
			quaternion_0.y,
			quaternion_0.z,
			quaternion_0.w
		);

		//Define variety in height
		if (i < instances / 3) {
			stretches.push(Math.random() * 1.8);
		} else {
			stretches.push(Math.random());
		}
	}

	return {
		offsets,
		orientations,
		stretches,
		halfRootAngleCos,
		halfRootAngleSin,
	};
}

function multiplyQuaternions(q1: Vector4, q2: Vector4) {
	const x = q1.x * q2.w + q1.y * q2.z - q1.z * q2.y + q1.w * q2.x;
	const y = -q1.x * q2.z + q1.y * q2.w + q1.z * q2.x + q1.w * q2.y;
	const z = q1.x * q2.y - q1.y * q2.x + q1.z * q2.w + q1.w * q2.z;
	const w = -q1.x * q2.x - q1.y * q2.y - q1.z * q2.z + q1.w * q2.w;
	return new Vector4(x, y, z, w);
}
