import { extend, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { GPUComputationRenderer } from "three/addons/misc/GPUComputationRenderer.js";
import gpgpuShader from "../shaders/gpgpu/particles.glsl";
import {
	BufferAttribute,
	InterleavedBufferAttribute,
	Texture,
	Uniform,
} from "three";
import { useControls } from "leva";

type Props = {
	position: BufferAttribute | InterleavedBufferAttribute;
};

extend({ GPUComputationRenderer });

export default function useGPGPU({ position }: Props) {
	const gl = useThree((state) => state.gl);
	const texture = useRef<Texture>();

	const { gpgpu, particlesVariable, size } = useMemo(() => {
		const count = position.count;
		const size = Math.ceil(Math.sqrt(count));

		const instance = new GPUComputationRenderer(size, size, gl);

		const baseParticlesTexture = instance.createTexture();

		for (let i = 0; i < count; i++) {
			const i3 = i * 3;
			const i4 = i * 4;

			baseParticlesTexture.image.data[i4 + 0] = position.array[i3 + 0];
			baseParticlesTexture.image.data[i4 + 1] = position.array[i3 + 1];
			baseParticlesTexture.image.data[i4 + 2] = position.array[i3 + 2];
			baseParticlesTexture.image.data[i4 + 3] = Math.random();
		}

		const particlesVar = instance.addVariable(
			"uParticles",
			gpgpuShader,
			baseParticlesTexture
		);
		instance.setVariableDependencies(particlesVar, [particlesVar]);

		texture.current = baseParticlesTexture;

		// Uniforms
		particlesVar.material.uniforms.uTime = new Uniform(0);
		particlesVar.material.uniforms.uDeltaTime = new Uniform(0);
		particlesVar.material.uniforms.uBase = new Uniform(baseParticlesTexture);
		particlesVar.material.uniforms.uFlowFieldInfluence = new Uniform(0.5);
		particlesVar.material.uniforms.uFlowFieldStrength = new Uniform(2);
		particlesVar.material.uniforms.uFlowFieldFrequency = new Uniform(0.5);

		return {
			gpgpu: instance,
			particlesVariable: particlesVar,
			size,
		};
	}, [position, gl]);

	useControls({
		flowFieldInfluence: {
			value: 0.5,
			min: 0,
			max: 1,
			onChange: (val) => {
				particlesVariable.material.uniforms.uFlowFieldInfluence.value = val;
			},
		},
		flowFieldStrength: {
			value: 2,
			min: 0,
			max: 10,
			onChange: (val) => {
				particlesVariable.material.uniforms.uFlowFieldStrength.value = val;
			},
		},
		flowFieldFrequency: {
			value: 0.5,
			min: 0,
			max: 1,
			onChange: (val) => {
				particlesVariable.material.uniforms.uFlowFieldFrequency.value = val;
			},
		},
	});

	useEffect(() => {
		gpgpu.init();
	}, [gpgpu]);

	useFrame(({ clock }, delta) => {
		particlesVariable.material.uniforms.uTime.value = clock.elapsedTime;
		particlesVariable.material.uniforms.uDeltaTime.value = delta;

		gpgpu.compute();
		texture.current = gpgpu.getCurrentRenderTarget(particlesVariable).texture;
	});

	return {
		texture,
		size,
	};
}
