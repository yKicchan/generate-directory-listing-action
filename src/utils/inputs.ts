import * as core from "@actions/core";

export type ActionInputs = {
	target: string;
	ignore: string[];
	showHiddenFiles: boolean;
	theme: string;
	override: boolean;
};

export const getInputs = (): ActionInputs => {
	const inputs = {
		target: core.getInput("target"),
		ignore: core
			.getInput("ignore")
			?.split(",")
			.map((i) => i.trim())
			.filter(Boolean),
		showHiddenFiles: core.getInput("showHiddenFiles").toUpperCase() === "TRUE",
		theme: core.getInput("theme"),
		override: core.getInput("override").toUpperCase() === "TRUE",
	};
	if (!inputs.target) {
		throw new Error("The target input is required");
	}
	core.info(
		`Inputs: ${Object.entries(inputs)
			.map(([key, value]) => `${key}=${value}`)
			.join(", ")}`,
	);
	return inputs;
};
