import type { Path } from "glob";
import { expect } from "vitest";
import { getFiles } from "./files";
import type { ActionInputs } from "./inputs";

describe("getFiles", () => {
	const setup = ({
		dir,
		root,
		inputs,
	}: Partial<{
		dir?: Path;
		root?: string;
		inputs?: Partial<Pick<ActionInputs, "ignore" | "showHiddenFiles">>;
	}> = {}) => getFiles(dir ?? ({} as Path), root ?? "", { ignore: [], ...inputs } as ActionInputs);

	it("ディレクトリ内のすべてのファイル(またはディレクトリ)を取得できソートされている", async () => {
		const dir = { fullpath: () => "sandbox" } as Path;
		const files = await setup({ dir });
		expect(files).toHaveLength(4);

		const expectedFiles = ["hidden", "html", "path", "theme.css"];
		files.forEach((file, i) => expect(file.name).toBe(expectedFiles[i]));
	});

	it("ignore が設定されているとき、そのファイル(またはディレクトリ)を無視する", async () => {
		const dir = { fullpath: () => "sandbox" } as Path;
		const inputs = { ignore: ["**/hidden"] } as ActionInputs;
		const files = await setup({ dir, inputs });
		expect(files).toHaveLength(3);

		const expectedFiles = ["html", "path", "theme.css"];
		files.forEach((file, i) => expect(file.name).toBe(expectedFiles[i]));
	});

	it("ignore はルートからの相対パスで動作する", async () => {
		const root = "sandbox";
		const dir = { fullpath: () => "sandbox" } as Path;
		const inputs = { ignore: ["hidden", "html", "path", "theme.css"] } as ActionInputs;
		const files = await setup({ dir, root, inputs });
		expect(files).toHaveLength(0);
	});

	it("showHiddenFiles が false のとき、隠しファイルを無視する", async () => {
		const dir = { fullpath: () => "sandbox/hidden" } as Path;
		const inputs = { showHiddenFiles: false } as ActionInputs;
		const files = await setup({ dir, inputs });
		expect(files).toHaveLength(0);
	});

	it("showHiddenFiles が true のとき、隠しファイルを表示する", async () => {
		const dir = { fullpath: () => "sandbox/hidden" } as Path;
		const inputs = { showHiddenFiles: true } as ActionInputs;
		const files = await setup({ dir, inputs });
		expect(files).toHaveLength(1);
		expect(files[0].name).toBe(".hidden");
	});
});
