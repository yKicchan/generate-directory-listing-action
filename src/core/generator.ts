import { promises as fs } from "node:fs";
import { join } from "node:path";
import * as core from "@actions/core";
import { type Path, glob } from "glob";
import { renderToString } from "preact-render-to-string";
import type { ActionInputs } from "src/utils/inputs";
import { HTML } from "./html";

export async function generate(root: string, dir: Path, inputs: ActionInputs) {
	const files = await glob(`${dir.fullpath()}/*`, {
		ignore: inputs.ignore,
		dot: inputs.showHiddenFiles,
		withFileTypes: true,
	});
	if (files.length === 0) {
		core.debug(`[Skip] No targets found in: ${dir.fullpath()}`);
		return;
	}
	if (!inputs.override && files.some((path) => path.name === "index.html")) {
		core.debug(`[Skip] index.html already exists in: ${dir.fullpath()}`);
		return;
	}

	core.debug(`Generating index for: ${dir.fullpath()}`);
	core.debug(`- Found ${files.length} target(s).`);

	const html = `<!DOCTYPE html>${renderToString(HTML({ root, dir, files, inputs }))}`;

	await fs.writeFile(join(dir.fullpath(), "index.html"), html, "utf-8");
	core.info(`Generated index for: ${dir.fullpath()}`);
}
