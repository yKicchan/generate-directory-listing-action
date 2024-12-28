declare module "postcss-preset-env" {
	import type { Plugin } from "postcss";

	interface PresetEnvOptions {
		stage?: number;
		features?: Record<string, boolean>;
	}

	const presetEnv: (options?: PresetEnvOptions) => Plugin;
	export = presetEnv;
}
