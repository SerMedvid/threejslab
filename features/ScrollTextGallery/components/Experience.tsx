import { Scroll, ScrollControls } from "@react-three/drei";
import Texts from "./Texts";
import { useThree } from "@react-three/fiber";
import Cover from "./Cover";

import { list } from "../data";
import IndexTracker from "./IndexTracker";
import Ripple from "./Ripple";

const lineHeight = 1;

export default function Experience() {
	const height = useThree((state) => state.viewport.height);
	const names = list.map(({ name }) => name);

	const nortmalPages = (list.length * lineHeight) / height;
	const pages = nortmalPages + 1;
	const pageMultiplier = pages / nortmalPages;

	return (
		<>
			<ScrollControls
				pages={pages}
				infinite
				damping={0.4}
			>
				<Ripple
					overlay={
						<Scroll>
							<Texts
								lineHeight={lineHeight}
								texts={names}
								onlyCurrent={true}
							/>
						</Scroll>
					}
				>
					<IndexTracker
						pageMultiplier={pageMultiplier}
						lineHeight={lineHeight}
					/>
					<Scroll>
						<Texts
							lineHeight={lineHeight}
							texts={names}
						/>
						<Texts
							lineHeight={lineHeight}
							texts={names}
							onlyCurrent={true}
						/>
					</Scroll>

					<Cover />
				</Ripple>
			</ScrollControls>
		</>
	);
}
