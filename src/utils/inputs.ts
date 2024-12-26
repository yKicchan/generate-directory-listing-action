import * as core from "@actions/core";

export type ActionInputs = {
	target: string;
	ignore?: string[];
	showHiddenFiles: boolean;
	theme?: string;
	override: boolean;
};

export const getInputs = (): ActionInputs => {
	const inputs = {
		target: core.getInput("target"),
		ignore: core
			.getInput("ignore")
			?.split(",")
			.map((i) => i.trim()),
		showHiddenFiles: core.getInput("showHiddenFiles").toUpperCase() === "TRUE",
		theme: core.getInput("theme"),
		override: core.getInput("override").toUpperCase() === "TRUE",
	};
	core.info(
		`Inputs: ${Object.entries(inputs)
			.map(([key, value]) => `${key}=${value}`)
			.join(", ")}`,
	);
	return inputs;
};
