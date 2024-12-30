import { promises } from "node:fs";
import type { Path } from "glob";
import type { ActionInputs } from "src/utils/inputs";
import { afterEach, beforeEach, expect } from "vitest";
import { generate } from "./generator";

vi.mock("./html", () => ({
	renderHTML: vi.fn().mockReturnValue("html"),
}));
const mockWriteFile = vi.spyOn(promises, "writeFile");

describe("generate", () => {
	beforeEach(() => {
		mockWriteFile.mockReturnValue(Promise.resolve());
	});
	afterEach(() => {
		vi.clearAllMocks();
	});

	const setup = ({ root, dir, inputs }: { root?: string; dir?: Path; inputs?: Partial<ActionInputs> }) =>
		generate(root ?? "", (dir ?? {}) as Path, { ignore: [], ...inputs } as ActionInputs);

	it("ファイルがなかったとき、何もしない", async () => {
		const dir = { fullpath: () => "unknown" } as Path;
		await setup({ dir });
		expect(mockWriteFile).not.toHaveBeenCalled();
	});

	it("index.html があるとき、何もしない", async () => {
		const dir = { fullpath: () => "sandbox/html" } as Path;
		await setup({ dir });
		expect(mockWriteFile).not.toHaveBeenCalled();
	});

	it("ディレクトリ内にファイル(またはディレクトリ)が1つ以上あるとき index.html を生成する", async () => {
		const dir = { fullpath: () => "sandbox" } as Path;
		await setup({ dir });
		expect(mockWriteFile).toHaveBeenCalledWith("sandbox/index.html", "html", "utf-8");
	});

	it("override が true のとき、すでに存在していても index.html 上書きする", async () => {
		const dir = { fullpath: () => "sandbox/html" } as Path;
		const inputs = { override: true } as ActionInputs;
		await setup({ dir, inputs });
		expect(mockWriteFile).toHaveBeenCalledWith("sandbox/html/index.html", "html", "utf-8");
	});

	it("ignore が設定されているとき、そのファイル(またはディレクトリ)を無視する", async () => {
		const dir = { fullpath: () => "sandbox/path" } as Path;
		const inputs = { ignore: ["**/ignore", "**/to"] } as ActionInputs;
		await setup({ dir, inputs });
		expect(mockWriteFile).not.toHaveBeenCalled();
	});

	it("ignore はルートからの相対パスで動作する", async () => {
		const dir = { fullpath: () => "sandbox" } as Path;
		const inputs = { ignore: ["hidden", "html", "path", "theme.css"] } as ActionInputs;
		await setup({ root: "sandbox", dir, inputs });
		expect(mockWriteFile).not.toHaveBeenCalled;
	});

	it("showHiddenFiles が false のとき、隠しファイルを無視する", async () => {
		const dir = { fullpath: () => "sandbox/hidden" } as Path;
		const inputs = { showHiddenFiles: false } as ActionInputs;
		await setup({ dir, inputs });
		expect(mockWriteFile).not.toHaveBeenCalled();
	});

	it("showHiddenFiles が true のとき、隠しファイルを表示する", async () => {
		const dir = { fullpath: () => "sandbox/hidden" } as Path;
		const inputs = { showHiddenFiles: true } as ActionInputs;
		await setup({ dir, inputs });
		expect(mockWriteFile).toHaveBeenCalledWith("sandbox/hidden/index.html", "html", "utf-8");
	});
});
