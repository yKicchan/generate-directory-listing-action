import { promises as fs } from "node:fs";
import { join } from "node:path";
import * as core from "@actions/core";
import { type Path, glob } from "glob";
import type { ActionInputs } from "src/utils/inputs";
import { generateCSS } from "./css";
import { generateHTML } from "./html";
import { generateList } from "./list";

export async function generate(root: string, dir: Path, inputs: ActionInputs) {
	const paths = await glob(`${dir.fullpath()}/*`, {
		ignore: inputs.ignore,
		dot: inputs.showHiddenFiles,
		withFileTypes: true,
	});
	if (paths.length === 0) {
		core.debug(`[Skip] No targets found in: ${dir.fullpath()}`);
		return;
	}
	if (!inputs.override && paths.some((path) => path.name === "index.html")) {
		core.debug(`[Skip] index.html already exists in: ${dir.fullpath()}`);
		return;
	}

	core.debug(`Generating index for: ${dir.fullpath()}`);
	core.debug(`- Found ${paths.length} target(s).`);

	const list = generateList(paths);
	const css = await generateCSS(inputs.target, inputs.theme);
	const location = dir.fullpath().substring(root.length) || "/";
	const html = generateHTML(location, css, list);

	await fs.writeFile(join(dir.fullpath(), "index.html"), html, "utf-8");
	core.info(`Generated index for: ${dir.fullpath()}`);
}
