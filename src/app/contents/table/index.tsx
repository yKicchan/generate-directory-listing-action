import * as core from "@actions/core";
import type { ContentProps } from "../index";
import { getExt, getHref, getLastModified, getSize } from "../shared/helper";

export function Table({ files, isRoot }: ContentProps) {
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
				{files.map((path) => (
					<TableRow
						key={path.name}
						dataAttr={{ "data-type": getExt(path) }}
						href={getHref(path)}
						name={path.name}
						size={getSize(path)}
						lastModified={getLastModified(path)}
					/>
				))}
			</tbody>
		</table>
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
