import { resolve } from "node:path";
import * as core from "@actions/core";
import { glob } from "glob";
import type { ActionInputs } from "./inputs";

export async function getDirectories(target: ActionInputs["target"], ignore: ActionInputs["ignore"]) {
	const targetDir = resolve(target);
	const directories = await glob(`${targetDir}/**/`, {
		ignore,
		withFileTypes: true,
	});

	const paths = directories.map((d) => d.fullpath()).join("\n  ");
	core.debug(`Found ${directories.length} directories: \n  ${paths}`);
	return directories;
}
