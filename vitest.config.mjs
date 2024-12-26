import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		globals: true,
		env: {
			TZ: "Asia/Tokyo",
		},
		coverage: {
			reporter: ["text", "json-summary", "html"],
		},
	},
});
