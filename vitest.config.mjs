import preact from "@preact/preset-vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [preact()],
	test: {
		root: "src",
		globals: true,
		environment: "happy-dom",
		setupFiles: ["./vitest.setup.mjs"],
		env: {
			TZ: "Asia/Tokyo",
			INPUT_TARGET: "test",
			INPUT_IGNORE: "",
			INPUT_SHOW_HIDDEN_FILES: "",
			INPUT_THEME: "",
			INPUT_OVERRIDE: "",
		},
		coverage: {
			reportsDirectory: "../coverage",
			reporter: ["text", "json-summary", "html"],
		},
	},
});
