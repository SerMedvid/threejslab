export type PageTransitionPlane = {
	id: string;
	img: string;
	title: string;
	url: string;
	text: string;
};

const data = [
	{
		id: "galapagos",
		img: "/assets/PageTransition/galapagos.jpg",
		title: "Galapagos, Ecuador",
		url: "/lab/page-transition/galapagos",
		text: `The Galápagos Islands, located roughly 600 miles off the coast of Ecuador, remained a closely guarded natural secret for millions of years. Over that time, the archipelago evolved into a home for an all-star cast of plants and animals. Sometime in the 1800s, some swashbuckling pirates and intrepid explorers started arriving in the Galápagos Islands. The most famous early visitor was Charles Darwin, a young naturalist who spent 19 days studying the islands' flora and fauna in 1835. In 1859, Darwin published On the Origin of Species, which introduced his theory of evolution — and the Galápagos Islands — to the world.

        Since then, word of these islands and their magnificent beauty has steadily grown. In 1959, the Galápagos became Ecuador's first national park, and in 1978, it was named a UNESCO World Heritage site. Today, more than 275,000 people visit the Galápagos every year to see those incredible animals and landscapes for themselves.
        
        As amazing as you think the Galápagos Islands will be, they routinely exceed expectations. It's a place where lizards swim, birds walk, and humans — for once — don't take center stage.`,
	},
	{
		id: "grand-canyon",
		img: "/assets/PageTransition/grand-canyon.jpg",
		title: "Grand Canyons, USA",
		url: "/lab/page-transition/grand-canyon",
		text: `The Grand Canyon is located in northern Arizona, northwest of the city of Flagstaff. The canyon measures over 270 miles long, up to 18 miles wide and a mile deep, making it one of the biggest canyons in the world.

        This natural landmark formed about five to six million years as erosion from the Colorado River cut a deep channel through layers of rock.
        
        The Grand Canyon contains some of the oldest exposed rock on Earth. The mile-high walls reveal a cross section of Earth’s crust going back nearly two billion years. These rock layers have given geologists the opportunity to study evolution through time.
        
        The oldest known rocks in the canyon, called the Vishnu Basement Rocks, can be found near the bottom of the Inner Gorge. The Vishnu rocks formed about 1.7 billion years ago when magma hardened and joined this region—once a volcanic ocean chain—to the North American continent.
        
        Today, tourists to Grand Canyon National Park can trace the canyon’s geologic history on the Trail of Time, an interpretive exhibit on the park’s South Rim.`,
	},
	{
		id: "plitvice-lakes",
		img: "/assets/PageTransition/plitvice-lakes.jpg",
		title: "Plitvice Lakes, Croatia",
		url: "/lab/page-transition/plitvice-lakes",
		text: "Designated Croatia’s first national park in 1949 and now one of the country's most popular attractions, Plitvice Lakes is a fairytale waterworld of opalescent pools, gushing waterfalls and interconnected watercourses framed by limestone karst canyons, caves and forests. The lakes sit on two levels, and the surrounding woodland is prowled by brown bears, wolves and lynx, with clusters of old-growth beech and fir trees alive with rare birds. Located in central Croatia, visitors can stay at a handful of hotels within the park boundaries.",
	},
	{
		id: "seven-sisters",
		img: "/assets/PageTransition/seven-sisters.jpg",
		title: "Seven Sisters, Norway",
		url: "/lab/page-transition/seven-sisters",
		text: `The Seven Sisters Waterfall was certainly the most famous of the waterfalls in the Geiranger Fjord (Geirangerfjorden), and we’ve come to associate the two over the years.

        Ever since our first cruise together on the Geirangerfjord under sunny skies, we learned that the fjord offered way more than this series of waterfalls.
        
        Indeed, we got a very memorable experience that also allowed us to better appreciate the steep walls and cliff-hanging farms.

        We also witnessed other major and minor waterfalls draping both sides of the fjord.

        Coupled with the beautiful weather that we happened to be experiencing during our time on our first tour, we simply couldn’t have asked for a better visual experience.

        In fact, the Geirangerfjord was gazetted as a UNESCO World Heritage Site during the year of our first visit in 2005.`,
	},
	{
		id: "wadi-rum",
		img: "/assets/PageTransition/wadi-rum.jpg",
		title: "Wadi Rum, Jordan",
		url: "/lab/page-transition/wadi-rum",
		text: "The lunar-like terrain of the Wadi Rum desert is so otherworldly that this protected area has established a thriving side business as a film set for Hollywood sci-fi movies, including The Martian, Prometheus and Rogue One: A Star Wars Story. Many visitors visit to experience being among the dunes, but the park is also packed with history, and the great emptiness is deceptive – people have inhabited this area since prehistoric times. You can visit Bedouin camps in sheltered rocky gorges, pore over ancient rock art inscriptions and learn about the period during WWI when locals joined the Arab Revolt alongside Lawrence of Arabia.        ",
	},
	{
		id: "yellowstone",
		img: "/assets/PageTransition/yellowstone.jpg",
		title: "Yellowstone, USA",
		url: "/lab/page-transition/yellowstone",
		text: `Yellowstone National Park, America's first National Park, offers truly unique experiences like spectacular hiking trails, beautiful views, Old Faithful, and geysers shooting water 100 feet into the air. Plan your visit with NPF's resources.
        When the first visitors to Yellowstone tried to report what they saw, news magazines responded, “Thank you, but we do not print fiction.” Peppered with colorful hot springs, mudpots, and breathtaking waterfalls, it is easy to understand how one might think it otherworldly. Nothing else on Earth is quite like Yellowstone--and there is something for everyone, from children to grandparents.
        
        Established in 1872 and located primarily in Wyoming, Yellowstone National Park was America's first national park. To this day, Yellowstone remains one of the country's most popular national parks with millions of annual visitors. Yellowstone spans almost 3,500 miles, and extends into parts of Montana and Idaho, making it one of the largest national parks in the US.
        
        Yellowstone National Park sits on top of a dormant volcano and is home to more geysers and hot springs than any other place on earth. Wonders abound at this truly unique national park, from sites like the Yellowstone Grand Canyon to wildlife like America’s largest buffalo herd, grizzly bears, and wolves. Approximately 50 percent of the world’s hydrothermal features are at Yellowstone National Park, creating an effect that makes the ground appear to be on fire. The most famous of all the geysers is Old Faithful, one of the most popular and recognized natural wonders in the United States.`,
	},
	{
		id: "vatnajokull",
		img: "/assets/PageTransition/vatnajokull.jpg",
		title: "Vatnajokull, Iceland",
		url: "/lab/page-transition/vatnajokull",
		text: "If you want classic Iceland, come to Vatnajokull. Here you’ll find all the natural wonders that this far-flung island has become famous for; luminous ice caves, foaming waterfalls, and glaciers that can be hiked on, feeding into glacial lagoons and immense canyons. And most of these attractions can be accessed relatively easily off Iceland’s Ring Road, four hours or so from Reykjavik. The park was created in 2008 by joining together Jokulsargljufur and Skaftafell National Parks to create a supersized area of over 12,000 square kilometres, making it the largest national park in Europe.",
	},
	{
		id: "calanques",
		img: "/assets/PageTransition/calanques.jpg",
		title: "Calanques, France",
		url: "/lab/page-transition/calanques",
		text: "Often overshadowed by the ritzy lure of the French Riviera, Calanques is a walk on the wild side to the riviera’s east, between Marseille and Cassis. The word ‘Calanques’ in French refers to the narrow, sheer-walled inlets that make the park’s topography so striking, and the park’s protection extends to both land and sea around a 20-kilometre coastline. Nobbled, limestone karst cliffs plunge into sapphire Mediterranean waters and droplets of sandy bays, with small fishing towns wedged in the crevices. Scuba-diving, rock climbing, kayaking and hiking are the main draws, and the park is easily accessible by boat tours from Marseille and on foot via a handful of car parks.",
	},
	{
		id: "tongariro",
		img: "/assets/PageTransition/tongariro.jpg",
		title: "Tongariro, New Zealand",
		url: "/lab/page-transition/tongariro",
		text: "Home to Lord of the Rings’ Mount Doom in real life, Tongariro National Park has dual World Heritage status for its cultural and natural significance. The park’s 19-kilometre Tongariro Alpine Crossing is also one of the best day hikes on the planet. It offers the chance to summit an active volcano, hiking over charred volcanic scree up to the Red Crater for stunning views of a trio of volcanic cones and a series of startling sulphurous pools called the Emerald Lakes. Frequent shuttles running between the nearby town of Taupo and the trailhead make it an easy day trip. ",
	},
];

export default data;
