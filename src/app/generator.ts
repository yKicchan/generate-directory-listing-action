import { promises as fs } from "node:fs";
import { join, resolve } from "node:path";
import * as core from "@actions/core";
import { type Path, glob } from "glob";
import type { ActionInputs } from "src/utils/inputs";
import { css } from "./css";

export async function generate(dir: Path, inputs: ActionInputs) {
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
	const css = await generateCss(inputs.target, inputs.theme);
	const html = generateHTML(dir, css, list);

	await fs.writeFile(join(dir.fullpath(), "index.html"), html, "utf-8");
	core.info(`Generated index for: ${dir.fullpath()}`);
}

function generateList(files: Path[]) {
	const links = files
		.map((path) => {
			const href = path.isDirectory() ? `${path.name}/` : path.name;
			const ext = path.isDirectory() ? "dir" : path.name.split(".").pop();
			return `<li><a href="${href}" data-name="${path.name}" data-type="${ext}">${path.name}</a></li>`;
		})
		.join("\n    ");

	core.debug(`- Generated list: ${files.map((path) => path.name).join(", ")}`);
	return `<ul>
    ${links}
  </ul>`;
}

async function generateCss(target: ActionInputs["target"], theme: ActionInputs["theme"]) {
	const style = (...css: string[]) => css.map((css) => `<style type="text/css">${css}</style>`).join("\n");

	if (!theme) return style(css);

	const targetDir = resolve(target);
	const path = join(targetDir, theme);
	try {
		await fs.access(path);
	} catch {
		core.warning(`- Theme file not found: ${path}`);
		return style(css);
	}

	const themeCss = await fs.readFile(path, "utf-8");
	core.debug(`- Using extended CSS: ${theme}`);
	return style(css, themeCss);
}

function generateHTML(dir: Path, css: string, list: string) {
	const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Index of ${dir.name}</title>
  ${css}
</head>
<body>
  <h1>Index of ${dir.name}</h1>
  ${list}
</body>
</html>`;

	core.debug(`- Generated ${dir.parentPath}${dir.name}/index.html: ${html}`);
	return html;
}
