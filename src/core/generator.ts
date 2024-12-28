import { promises as fs } from "node:fs";
import { join } from "node:path";
import * as core from "@actions/core";
import bytes from "bytes";
import { type Path, glob } from "glob";
import { renderToString } from "preact-render-to-string";
import type { ActionInputs } from "src/utils/inputs";
import color from "../utils/color";
import { truncate } from "../utils/truncate";
import { HTML } from "./html";

export async function generate(root: string, dir: Path, inputs: ActionInputs) {
	const files = await glob(join(dir.fullpath(), "*"), {
		ignore: inputs.ignore.map((i) => join(root, i)),
		dot: inputs.showHiddenFiles,
		withFileTypes: true,
	});

	if (files.length === 0) {
		core.debug(color.yellow(`[Skip] No targets found in: ${dir.fullpath()}`));
		return;
	}
	if (!inputs.override && files.some((file) => file.name === "index.html")) {
		core.debug(color.yellow(`[Skip] 'index.html' already exists in: ${dir.fullpath()}`));
		return;
	}

	core.debug(color.green("Generating 'index.html' at: ") + color.blue(dir.fullpath()));
	core.debug(`- Found ${files.length} target(s).`);

	const htmlComponent = await HTML({ root, dir, files, inputs });
	const html = `<!DOCTYPE html>${renderToString(htmlComponent)}`;

	await fs.writeFile(join(dir.fullpath(), "index.html"), html, "utf-8");
	core.info(color.green(`Successfully generated 'index.html' at: `) + color.blue(dir.fullpath()));
	core.info(`- File size: ${bytes(html.length)}`);

	core.debug(`- Generated HTML content is: ${color.magenta(truncate(html))}`);
}
