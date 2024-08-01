import { useTexture } from "@react-three/drei";

export const slides = [
	{
		id: 1,
		prompt:
			"a colorful festival of lanterns background, beautiful androgynous, lace and velvet Yukata, beautiful face, beautiful legs, light orange eyes, very happy face, full body, colorful colors, detailed background beautiful, 7-eleven store, night vibe,high quality, 8K Ultra HD, 3D effect, A digital illustration of anime style, soft anime tones, Atmosphere like Kyoto Animation, luminism, three dimensional effect, luminism, 3d render, octane render, Isometric, awesome full color, delicate and anime character expressions, playful body manipulations, smile, gaze into the camera, Whimsical lighting, Enchanted ambiance, Soft textures, Imaginative artwork, Ethereal glow, Silent Luminescence, Whispering Silent, Iridescent Encounter, pixie dust glittering, vibrant background, full body, (((rule of thirds))), high quality, high detail, high resolution, (bokeh:2), backlight, long exposure:2",
		img: "/assets/Pixalated/img_1.jpg",
	},
	{
		id: 2,
		prompt:
			"((90's anime style)), ultra detailed illustration of jinx from league of legends, with shield in New York 1990s ((art by Masakazu Katsura)), trigun, DNA², Ranma, ultra detailed face, bold ink lines, cel shaded, art by MSchiffer, soft muted colors, lomography colors, vintage warm, dark vignette",
		img: "/assets/Pixalated/img_2.jpg",
	},
	{
		id: 3,
		prompt:
			"(full shot)(full body) Illustration halloween style of colorful creepy cyborg mad Maid monster mad Maidmech mix zombiemech wormmech space alienmech vector anime t-shirt design mutant cosmic modern insect t-shirt design cyberpunk style with Lots of details all in frame, that has a white pink green fire inside Gunslinger with Lots of details, horror DC COMIC style with Lots of details, all in frame, plain flat color background",
		img: "/assets/Pixalated/img_3.jpg",
	},
	{
		id: 4,
		prompt:
			"burning statue sculpture designed by daniel popper, bonfire ritual on the summer solstice, purification, subtle film grain and meticulous shading add depth and texture, emphasizing the emotional gravity of the scene. The lighting creates a chiaroscuro effect, accentuating her expressive pose and the intense atmosphere. tenet time entropy inversion. john carpenter and michael bay vfx.",
		img: "/assets/Pixalated/img_4.jpg",
	},
	{
		id: 5,
		prompt:
			"Create an anime-style scene inspired by the provided image. Illustrate a city street at night, bathed in neon lights and vibrant hues, capturing the atmospheric, cinematic feel. Focus on a character lounging on a bench outside a modern cafe, wearing trendy, casual attire and sunglasses, exuding a cool, relaxed demeanor. The foreground features a long, reflective table leading towards the character, emphasizing depth and perspective. In the background, other characters and city elements, such as glowing signs and distant pedestrians, add to the lively, urban environment. The overall mood should blend a sense of calm and introspection with the bustling energy of a futuristic city night, rendered in a detailed and expressive anime style. Simulate an Arri Alexa XT studio camera with Zeiss Master Prime lenses for sharp, character-rich images. Detailed facial features. Include anamorphic effects for a cinematic look with characteristic bokeh and flares. Target Ultra HD, 8K resolution for hyperrealistic detail and textures throughout the scene. Utilize real-time ray tracing and HDRI for lifelike lighting and dynamic scene illumination. Use physically based rendering for authentic material appearances and subsurface scattering for realism in skin and materials. Employ the rule of thirds, leading lines, and vanishing points for compelling composition, with symmetry as needed",
		img: "/assets/Pixalated/img_5.jpg",
	},
	{
		id: 6,
		prompt:
			"(full shot)(full body) Illustration halloween style of colorful creepy cyborg mad Maid monster mad Maidmech mix zombiemech wormmech space alienmech vector anime t-shirt design mutant cosmic modern insect t-shirt design cyberpunk style with Lots of details all in frame, that has a white pink green fire inside Gunslinger with Lots of details, horror DC COMIC style with Lots of details, all in frame, plain flat color background",
		img: "/assets/Pixalated/img_6.jpg",
	},
	{
		id: 7,
		prompt:
			"Quick cuts of various adversaries—pirates, rival treasure hunters, shadowy figures—preparing for the chase. Each adversary is shown arming themselves, strategizing, and setting off on the hunt, creating a sense of imminent danger and urgency",
		img: "/assets/Pixalated/img_7.jpg",
	},
	{
		id: 8,
		prompt:
			"create the character Tanjirō Kamado from the anime demon slayer in fighting pose",
		img: "/assets/Pixalated/img_8.jpg",
	},
];

slides.forEach((slide) => {
	useTexture.preload(slide.img);
});
