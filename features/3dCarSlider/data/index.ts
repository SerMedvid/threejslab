export const scenes = [
	{
		path: "/assets/3dCarSlider/cars/car_scene_1.gltf",
		mainColor: "#f9c0ff",
		name: "Aurora S500",
		description: "New generation of premium. Faster. Lighter. Safer ",
		price: "120.000",
		range: 1200,
	},
	{
		path: "/assets/3dCarSlider/cars/car_scene_2.gltf",
		mainColor: "#c0ffe1",
		name: "Aurora F150",
		description: "Havy duty, heavy protected, heavy endurant",
		price: "95.000",
		range: 750,
	},
	{
		path: "/assets/3dCarSlider/cars/car_scene_3.gltf",
		mainColor: "#ffdec0",
		name: "Aurora D100",
		description: "New world in passenger and commercial transportation.",
		price: "150.000",
		range: 1500,
	},
];

export type SceneSlide = (typeof scenes)[number];
