import { build } from "esbuild";

build({
	entryPoints: ["./src/index.ts"],
	platform: "node",
	bundle: true,
	outfile: "./dist/index.js",
	minify: true,
	loader: { ".tsx": "tsx", ".ts": "ts", ".css": "text", ".pcss": "text", ".svg": "dataurl", ".png": "dataurl" },
}).catch((e) => {
	process.stderr.write(e.stderr);
	process.exit(1);
});
