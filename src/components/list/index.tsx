import * as core from "@actions/core";
import type { Path } from "glob";

export interface P {
	files: Path[];
}

export function List({ files }: P) {
	if (files.length === 0) {
		core.debug("- [Skip] Generate list: No files found.");
		return <EmptyList />;
	}

	const items = files.map((path) => <ListItem key={path.name} path={path} />);
	core.debug(`- Generated list: ${files.map((path) => path.name).join(", ")}`);
	return <ul>{items}</ul>;
}

function ListItem({ path }: { path: Path }) {
	const href = path.isDirectory() ? `${path.name}/` : path.name;
	const ext = path.isDirectory() ? "dir" : path.name.split(".").pop();
	return (
		<li>
			<a href={href} data-name={path.name} data-type={ext}>
				{path.name}
			</a>
		</li>
	);
}

function EmptyList() {
	return <p>No files found.</p>;
}
