import { build } from "esbuild";

build({
	entryPoints: ["./src/index.ts"],
	platform: "node",
	bundle: true,
	outfile: "./dist/index.js",
	minify: true,
	loader: { ".tsx": "tsx", ".ts": "ts", ".css": "text" },
}).catch((e) => {
	process.stderr.write(e.stderr);
	process.exit(1);
});
