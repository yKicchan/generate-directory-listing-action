import * as core from "@actions/core";
import type { Path } from "glob";

import * as self from "./list";

export function generateList(files: Path[]) {
	if (files.length === 0) {
		core.debug("- [Skip] Generate list: No files found.");
		return "";
	}

	const links = files.map(self.generateListItem).join("\n    ");
	core.debug(`- Generated list: ${files.map((path) => path.name).join(", ")}`);

	return `<ul>
    ${links}
  </ul>`;
}

export function generateListItem(path: Path) {
	const href = path.isDirectory() ? `${path.name}/` : path.name;
	const ext = path.isDirectory() ? "dir" : path.name.split(".").pop();
	return `<li><a href="${href}" data-name="${path.name}" data-type="${ext}">${path.name}</a></li>`;
}
