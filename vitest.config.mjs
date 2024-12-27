import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		globals: true,
		env: {
			TZ: "Asia/Tokyo",
			INPUT_TARGET: "test",
			INPUT_IGNORE: "",
			INPUT_SHOW_HIDDEN_FILES: "",
			INPUT_THEME: "",
			INPUT_OVERRIDE: "",
		},
		coverage: {
			reporter: ["text", "json-summary", "html"],
		},
	},
});
