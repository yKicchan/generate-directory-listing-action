import * as core from "@actions/core";
import { getDirectories } from "../utils/directories";
import { getInputs } from "../utils/inputs";
import { generate } from "./generator";

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run() {
	const start = new Date();
	core.info(`Starting action at ${start.toLocaleString()}`);

	const inputs = getInputs();
	const { root, directories } = await getDirectories(inputs.target, inputs.ignore);

	for (const dir of directories) {
		await generate(root, dir, inputs);
	}

	const end = new Date();
	core.info(`Action completed at ${end.toLocaleString()}`);
	const diff = end.getTime() - start.getTime();
	core.info(`Total time: ${diff}ms`);
}
