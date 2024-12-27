import fs from "node:fs";
import * as core from "@actions/core";
import bytes from "bytes";
import type { Path } from "glob";

export interface P {
	files: Path[];
}

export function Table({ files }: P) {
	const rows = files.map((path) => <TableRow key={path.name} path={path} />);
	core.debug(`- Generated list: ${files.map((path) => path.name).join(", ")}`);
	return (
		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Size</th>
					<th>Last Modified</th>
				</tr>
			</thead>
			<tbody>{rows}</tbody>
		</table>
	);
}

function TableRow({ path }: { path: Path }) {
	const file = fs.statSync(path.fullpath());
	const href = path.isDirectory() ? `${path.name}/` : path.name;
	const ext = path.isDirectory() ? "dir" : path.name.split(".").pop();
	return (
		<tr data-name={path.name} data-type={ext} data-testid={path.name}>
			<td>
				<a href={href}>{path.name}</a>
			</td>
			<td>{bytes(file.size)}</td>
			<td>{file.mtime.toLocaleString()}</td>
		</tr>
	);
}
