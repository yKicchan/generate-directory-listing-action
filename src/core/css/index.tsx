import { accessSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import * as core from "@actions/core";
import cssnano from "cssnano";
import postcss from "postcss";
import flexbugsFixes from "postcss-flexbugs-fixes";
import presetEnv from "postcss-preset-env";
import pcss from "../../assets/global.pcss";
import type { ActionInputs } from "../../utils/inputs";

export interface P {
	target: ActionInputs["target"];
	theme: ActionInputs["theme"];
}

export async function CSS({ target, theme }: P) {
	const css = await applyPostcssPlugins(pcss);
	const base = <style>{css}</style>;
	if (!theme) return base;

	const targetDir = resolve(target);
	const path = join(targetDir, theme);
	try {
		accessSync(path);
	} catch {
		core.warning(`- Theme file not found: ${path}`);
		return base;
	}

	const themePcss = readFileSync(path, "utf-8");
	const themeCss = await applyPostcssPlugins(themePcss);
	core.debug(`- Using extended CSS: ${theme}`);
	return (
		<>
			{base}
			<style>{themeCss}</style>
		</>
	);
}

async function applyPostcssPlugins(css: string) {
	const result = await postcss([presetEnv(), flexbugsFixes(), cssnano()]).process(css, { from: undefined });
	return result.css;
}
