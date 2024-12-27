import type { Path } from "glob";
import type { ViewTypes } from "../utils/view-types";
import { Contents } from "./contents";
import { Footer } from "./footer";
import { Header } from "./header";

export interface P {
	location: string;
	files: Path[];
	viewType: ViewTypes;
}

export function App({ location, files, viewType }: P) {
	return (
		<>
			<Header location={location} />
			<Contents files={files} viewType={viewType} />
			<Footer />
		</>
	);
}
