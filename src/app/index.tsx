import { Contents, type P as ContentsProps } from "./contents";
import { Footer } from "./footer";
import { Header, type P as HeaderProps } from "./header";

export type P = HeaderProps & ContentsProps;

export function App({ location, ...contentsProps }: P) {
	return (
		<>
			<Header location={location} />
			<Contents {...contentsProps} />
			<Footer />
		</>
	);
}
