import { accessSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import * as core from "@actions/core";
import type { ActionInputs } from "../../utils/inputs";
import css from "./index.css";

export interface P {
	target: ActionInputs["target"];
	theme: ActionInputs["theme"];
}

export function CSS({ target, theme }: P) {
	const base = <style>{css.replace(/\s+/g, "")}</style>;
	if (!theme) return base;

	const targetDir = resolve(target);
	const path = join(targetDir, theme);
	try {
		accessSync(path);
	} catch {
		core.warning(`- Theme file not found: ${path}`);
		return base;
	}

	const themeCss = readFileSync(path, "utf-8");
	core.debug(`- Using extended CSS: ${theme}`);
	return (
		<>
			{base}
			<style>{themeCss}</style>
		</>
	);
}
