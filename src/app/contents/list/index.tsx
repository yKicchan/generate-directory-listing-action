import * as core from "@actions/core";
import type { ContentProps } from "../index";
import { getExt, getHref } from "../shared/helper";

export function List({ files, isRoot }: ContentProps) {
	core.debug(`- Generated list: ${files.map((path) => path.name).join(", ")}`);
	return (
		<ul>
			{!isRoot && <ListRow href={"../"} name=".." dataAttr={{ "data-type": "parent" }} />}
			{files.map((path) => (
				<ListRow key={path.name} dataAttr={{ "data-type": getExt(path) }} href={getHref(path)} name={path.name} />
			))}
		</ul>
	);
}

interface ListRowProps {
	href: string;
	name: string;
	dataAttr?: Record<`data-${string}`, string>;
}

function ListRow({ href, name, dataAttr = {} }: ListRowProps) {
	return (
		<li data-name={name} {...dataAttr}>
			<a href={href}>{name}</a>
		</li>
	);
}
