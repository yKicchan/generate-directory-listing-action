import { promises as fs } from "node:fs";
import { join } from "node:path";
import * as core from "@actions/core";
import { type Path, glob } from "glob";
import { renderToString } from "preact-render-to-string";
import type { ActionInputs } from "src/utils/inputs";
import color from "../utils/color";
import { HTML } from "./html";

export async function generate(root: string, dir: Path, inputs: ActionInputs) {
	const files = await glob(`${dir.fullpath()}/*`, {
		ignore: inputs.ignore,
		dot: inputs.showHiddenFiles,
		withFileTypes: true,
	});
	if (files.length === 0) {
		core.debug(color.yellow(`[Skip] No targets found in: ${dir.fullpath()}`));
		return;
	}
	if (!inputs.override && files.some((path) => path.name === "index.html")) {
		core.debug(color.yellow(`[Skip] index.html already exists in: ${dir.fullpath()}`));
		return;
	}

	core.debug(color.cyan(`Generating index for: ${dir.fullpath()}`));
	core.debug(`- Found ${files.length} target(s).`);

	const htmlComponent = await HTML({ root, dir, files, inputs });
	const html = `<!DOCTYPE html>${renderToString(htmlComponent)}`;

	await fs.writeFile(join(dir.fullpath(), "index.html"), html, "utf-8");
	core.info(color.blue(`Generated index for: ${dir.fullpath()}`));
	core.debug(`- Generated HTML content is: ${color.green(html)}`);
}
