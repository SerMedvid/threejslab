import { useThree } from "@react-three/fiber";
import GalleryItem from "./GalleryItem";

const PER_CHUNK = 3;

const imgs = [...Array(15)].map(
	(_, idx) => `/assets/FurnitureGallery/${idx + 1}.jpg`
);

const groupedImgs = [...imgs, ...imgs].reduce((accum, item, idx) => {
	const chunkIndex = Math.floor(idx / PER_CHUNK);

	if (!accum[chunkIndex]) {
		accum[chunkIndex] = [];
	}

	accum[chunkIndex].push(item);

	return accum;
}, [] as string[][]);

export default function Gallery({ modifier = 0.4 }) {
	const { width } = useThree((state) => state.viewport);
	const imageWidth = width < 10 ? 1.5 / 3 : 1.2 / 3;

	return groupedImgs.map((chunk, idx) => (
		<group
			key={idx}
			position={[width * (idx - 1), 0, 0]}
		>
			{chunk.map((img, innerIdx) => (
				<>
					<GalleryItem
						key={`${img}_${innerIdx}`}
						url={img}
						scale={[width * imageWidth - modifier * 2, 5]}
						position={[width * imageWidth * (innerIdx - 1), 0, innerIdx - 1]}
					/>
				</>
			))}
		</group>
	));
}
