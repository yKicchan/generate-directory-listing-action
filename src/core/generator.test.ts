import { promises } from "node:fs";
import type { Path } from "glob";
import type { ActionInputs } from "src/utils/inputs";
import { afterEach, beforeEach, expect } from "vitest";
import { generate } from "./generator";

vi.mock("preact-render-to-string", () => ({
	renderToString: vi.fn().mockReturnValue("html"),
}));
const mockWriteFile = vi.spyOn(promises, "writeFile");

describe("generate", () => {
	beforeEach(() => {
		mockWriteFile.mockReturnValue(Promise.resolve());
	});
	afterEach(() => {
		vi.clearAllMocks();
	});

	it("ファイルがなかったとき、何もしない", async () => {
		const dir = { fullpath: () => "unknown" } as Path;
		const inputs = {} as ActionInputs;
		await generate("", dir, inputs);
		expect(mockWriteFile).not.toHaveBeenCalled();
	});

	it("index.htmlがあるとき、何もしない", async () => {
		const dir = { fullpath: () => "sandbox/html" } as Path;
		const inputs = {} as ActionInputs;
		await generate("", dir, inputs);
		expect(mockWriteFile).not.toHaveBeenCalled();
	});

	it("index.htmlを生成する", async () => {
		const dir = { fullpath: () => "sandbox" } as Path;
		const inputs = {} as ActionInputs;
		await generate("", dir, inputs);
		expect(mockWriteFile).toHaveBeenCalledWith("sandbox/index.html", "<!DOCTYPE html>html", "utf-8");
	});

	it("override が true のとき、すでに存在していても index.html を生成する", async () => {
		const dir = { fullpath: () => "sandbox/html" } as Path;
		const inputs = { override: true } as ActionInputs;
		await generate("", dir, inputs);
		expect(mockWriteFile).toHaveBeenCalledWith("sandbox/html/index.html", "<!DOCTYPE html>html", "utf-8");
	});

	it("ignore が設定されているとき、対象外のファイルを無視する", async () => {
		const dir = { fullpath: () => "sandbox/path" } as Path;
		const inputs = { ignore: ["**/ignore", "**/to"] } as ActionInputs;
		await generate("", dir, inputs);
		expect(mockWriteFile).not.toHaveBeenCalled();
	});

	it("showHiddenFiles が false のとき、隠しファイルを無視する", async () => {
		const dir = { fullpath: () => "sandbox/hidden" } as Path;
		const inputs = { showHiddenFiles: false } as ActionInputs;
		await generate("", dir, inputs);
		expect(mockWriteFile).not.toHaveBeenCalled();
	});

	it("showHiddenFiles が true のとき、隠しファイルを表示する", async () => {
		const dir = { fullpath: () => "sandbox/hidden" } as Path;
		const inputs = { showHiddenFiles: true } as ActionInputs;
		await generate("", dir, inputs);
		expect(mockWriteFile).toHaveBeenCalledWith("sandbox/hidden/index.html", "<!DOCTYPE html>html", "utf-8");
	});
});
