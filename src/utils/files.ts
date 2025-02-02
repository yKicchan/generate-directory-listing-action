import { join } from "node:path";
import { type Path, glob } from "glob";
import type { ActionInputs } from "./inputs";

export async function getFiles(dir: Path, root: string, inputs: Pick<ActionInputs, "ignore" | "showHiddenFiles">) {
	const files = await glob(join(dir.fullpath(), "*"), {
		ignore: inputs.ignore.map((i) => join(root, i)),
		dot: inputs.showHiddenFiles,
		withFileTypes: true,
	});

	return files.sort((a, b) => {
		const isDirA = a.isDirectory();
		const isDirB = b.isDirectory();

		if (isDirA && !isDirB) {
			return -1;
		}

		if (!isDirA && isDirB) {
			return 1;
		}

		return a.name.localeCompare(b.name);
	});
}
