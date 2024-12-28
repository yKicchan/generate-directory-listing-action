import type { Path } from "glob";
import { App } from "../../app";
import type { ActionInputs } from "../../utils/inputs";
import { CSS } from "../css";

export interface P {
	root: string;
	dir: Path;
	files: Path[];
	inputs: ActionInputs;
}

const rootLocation = "/" as const;

export async function HTML({ root, dir, files, inputs }: P) {
	const location = dir.fullpath().substring(root.length) || rootLocation;
	const cssComponent = await CSS({ target: inputs.target, theme: inputs.theme });

	return (
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Index of {location}</title>
				<link rel="stylesheet" href="https://unpkg.com/ress/dist/ress.min.css" />
				{cssComponent}
			</head>
			<body>
				<App location={location} files={files} viewType={inputs.viewType} isRoot={location === rootLocation} />
			</body>
		</html>
	);
}
