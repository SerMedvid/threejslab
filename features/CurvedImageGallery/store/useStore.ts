import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export const images = [
	{
	  id: "1a2b3c",
	  imageSrc: "/assets/CurvedImageGallery/Leonardo_Phoenix_A_quiet_cozy_neighborhood_with_small_houses_a_2.jpg",
	  name: "A quiet cozy neighborhood with small houses"
	},
	{
	  id: "4d5e6f",
	  imageSrc: "/assets/CurvedImageGallery/Default_A_vibrant_description_of_an_underwater_world_with_bril_2_88e679c9-1c55-4344-8c98-f765821ac660_0.jpg",
	  name: "A vibrant description of an underwater world with brilliant colors"
	},
	{
	  id: "7g8h9i",
	  imageSrc: "/assets/CurvedImageGallery/Default_high_quality_8K_Ultra_HD_3D_effect_A_digital_illustrat_3_0fb418a6-a38c-4a84-b687-49944f494963_0.jpg",
	  name: "High quality 8K Ultra HD 3D effect digital illustration"
	},
	{
	  id: "j1k2l3",
	  imageSrc: "/assets/CurvedImageGallery/Default_landscapebeautifulrainsunnyfantasyephemeralBlueanimebr_0_e8e7644a-046a-4a72-b9c4-13bf09bef291_0.jpg",
	  name: "Landscape beautiful rain sunny fantasy ephemeral Blue anime"
	},
	{
	  id: "m4n5o6",
	  imageSrc: "/assets/CurvedImageGallery/Default_The_hippo_roars_and_swings_his_massive_fist_towards_th_0_709a5817-a2f0-433d-bc72-e62d0447cbae_0.jpg",
	  name: "The hippo roars and swings his massive fist"
	},
	{
	  id: "p7q8r9",
	  imageSrc: "/assets/CurvedImageGallery/Leonardo_Anime_XL_A_beautiful_woman_immersed_in_music_through_1.jpg",
	  name: "A beautiful woman immersed in music"
	},
	{
	  id: "s1t2u3",
	  imageSrc: "/assets/CurvedImageGallery/Leonardo_Anime_XL_imagine_prompt_Viral_anime_space_wallpaper_i_2.jpg",
	  name: "Viral anime space wallpaper"
	}
  ];

type Store = {
	slides: typeof images;
	currentImage: string | null;
	setCurrentImage: (image: string | null) => void;
};

const useStore = create<Store>()(
	subscribeWithSelector((set) => ({
		slides: images,	
		currentImage: null,
		setCurrentImage: (image: string | null) => set({ currentImage: image }),
	}))
);

export default useStore;
