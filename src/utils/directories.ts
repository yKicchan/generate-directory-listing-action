import fs from "node:fs";
import { join, resolve } from "node:path";
import * as core from "@actions/core";
import { glob } from "glob";
import type { ActionInputs } from "./inputs";

export async function getDirectories(target: ActionInputs["target"], ignore: ActionInputs["ignore"]) {
	const targetDir = resolve(target);
	const directories = await glob(join(targetDir, "**/"), {
		ignore: ignore.map((i) => join(targetDir, i, "**/")),
		withFileTypes: true,
	});

	const paths = directories.map((d) => d.fullpath()).join("\n  ");
	core.debug(`Found ${directories.length} directories: \n  ${paths}`);
	return { root: targetDir, directories };
}

export function getDirSize(path: string): number {
	return glob.sync(`${path}/**/*`, { nodir: true }).reduce((acc, path) => acc + fs.statSync(path).size, 0);
}
