import { promises as fs } from "node:fs";
import { join, resolve } from "node:path";
import * as core from "@actions/core";
import type { ActionInputs } from "../utils/inputs";

import * as self from "./css";

export const css = /* css */ `
h1 {
  color: red;
}

ul {
  margin: 0;
}

li {
  margin: 0;
}
`.replace(/\s+/g, "");

export async function generateCSS(target: ActionInputs["target"], theme: ActionInputs["theme"]) {
	if (!theme) return self.generateStyle(css);

	const targetDir = resolve(target);
	const path = join(targetDir, theme);
	try {
		await fs.access(path);
	} catch {
		core.warning(`- Theme file not found: ${path}`);
		return self.generateStyle(css);
	}

	const themeCss = await fs.readFile(path, "utf-8");
	core.debug(`- Using extended CSS: ${theme}`);
	return self.generateStyle(css, themeCss);
}

export function generateStyle(...css: string[]) {
	return css.map((css) => /* html */ `<style type="text/css">${css}</style>`).join("\n");
}
