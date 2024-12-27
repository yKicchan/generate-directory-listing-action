import * as core from "@actions/core";
import { ViewTypes, isViewType } from "./view-types";

export type ActionInputs = {
	target: string;
	ignore: string[];
	showHiddenFiles: boolean;
	theme: string;
	viewType: ViewTypes;
	override: boolean;
};

export const getInputs = (): ActionInputs => {
	const viewType = core.getInput("viewType")?.toUpperCase() || ViewTypes.Table;

	if (!isViewType(viewType)) {
		throw new Error(`The viewType input must be one of the following: [${Object.values(ViewTypes).join(", ")}]`);
	}

	const inputs: ActionInputs = {
		target: core.getInput("target"),
		ignore: core
			.getInput("ignore")
			?.split(",")
			.map((i) => i.trim())
			.filter(Boolean),
		showHiddenFiles: core.getInput("showHiddenFiles").toUpperCase() === "TRUE",
		theme: core.getInput("theme"),
		viewType,
		override: core.getInput("override").toUpperCase() === "TRUE",
	};

	if (!inputs.target) {
		throw new Error("The target input is required.");
	}

	core.info(
		`Inputs: ${Object.entries(inputs)
			.map(([key, value]) => `${key}=${value}`)
			.join(", ")}`,
	);
	return inputs;
};
