import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./features/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			fontFamily: {
				headline: "var(--font-headers)",
			},
			keyframes: {
				fadeup: {
					"0%": {
						opacity: "0",
						transform: "translateY(100px)",
						filter: "blur(9px)",
					},
					"100%": { opacity: "1", filter: "none" },
				},
				fadein: {
					"0%": {
						opacity: "0",
					},
					"100%": { opacity: "1" },
				},
				fadeout: {
					"0%": {
						opacity: "1",
					},
					"100%": { opacity: "0" },
				},
			},
		},
	},
	plugins: [require("tailwind-scrollbar")],
};
export default config;
