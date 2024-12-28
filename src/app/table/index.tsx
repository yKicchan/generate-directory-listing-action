import fs from "node:fs";
import * as core from "@actions/core";
import bytes from "bytes";
import type { Path } from "glob";
import { getDirSize } from "../../utils/directories";

export interface P {
	files: Path[];
	isRoot: boolean;
}

export function Table({ files, isRoot }: P) {
	const rows = files.map((path) => <FileRow key={path.name} path={path} />);
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
			<tbody>
				{!isRoot && <TableRow href={"../"} name=".." dataAttr={{ "data-type": "parent" }} />}
				{rows}
			</tbody>
		</table>
	);
}

function FileRow({ path }: { path: Path }) {
	const file = fs.statSync(path.fullpath());

	const href = file.isDirectory() ? `${path.name}/` : path.name;
	const ext = file.isDirectory() ? "dir" : (path.name.split(".").pop() ?? "");

	const size = file.isFile() ? file.size : file.isDirectory() ? getDirSize(path.fullpath()) : 0;

	return (
		<TableRow
			dataAttr={{
				"data-type": ext,
			}}
			href={href}
			name={path.name}
			size={bytes(size) ?? "-"}
			lastModified={file.mtime.toLocaleString()}
		/>
	);
}

interface TableRowProps {
	href: string;
	name: string;
	size?: string;
	lastModified?: string;
	dataAttr?: Record<`data-${string}`, string>;
}

function TableRow({ href, name, size = "-", lastModified = "-", dataAttr = {} }: TableRowProps) {
	return (
		<tr data-name={name} {...dataAttr}>
			<td>
				<a href={href}>{name}</a>
			</td>
			<td>{size}</td>
			<td>{lastModified}</td>
		</tr>
	);
}
