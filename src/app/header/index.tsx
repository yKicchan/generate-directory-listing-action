export interface P {
	location: string;
}

export function Header({ location }: P) {
	return (
		<header>
			<h1>Index of {location}</h1>
		</header>
	);
}
