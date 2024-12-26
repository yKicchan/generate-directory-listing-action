import { promises } from "node:fs";
import type { Path, glob } from "glob";
import type { ActionInputs } from "src/utils/inputs";
import * as css from "./css";
import { generate } from "./generator";
import * as html from "./html";
import * as list from "./list";

const mockWriteFile = vi.spyOn(promises, "writeFile").mockResolvedValue();
const mockGenerateCSS = vi.spyOn(css, "generateCSS").mockReturnValue(Promise.resolve("css"));
const mockGenerateHTML = vi.spyOn(html, "generateHTML").mockReturnValue("html");
const mockGenerateList = vi.spyOn(list, "generateList").mockReturnValue("list");

describe("generate", () => {
	beforeEach(() => {
		mockWriteFile.mockClear();
		mockGenerateCSS.mockClear();
		mockGenerateHTML.mockClear();
		mockGenerateList.mockClear();
	});

	const expectMocksNotCalled = () => {
		expect(mockGenerateCSS).not.toHaveBeenCalled();
		expect(mockGenerateHTML).not.toHaveBeenCalled();
		expect(mockGenerateList).not.toHaveBeenCalled();
		expect(mockWriteFile).not.toHaveBeenCalled();
	};
	const expectMocksCalled = (dir: Path, out: string) => {
		expect(mockGenerateList).toHaveBeenCalled();
		expect(mockGenerateCSS).toHaveBeenCalled();
		expect(mockGenerateHTML).toHaveBeenCalledWith(dir, "css", "list");
		expect(mockWriteFile).toHaveBeenCalledWith(out, "html", "utf-8");
	};

	it("ファイルがなかったとき、何もしない", async () => {
		const dir = { fullpath: () => "unknown" } as Path;
		const inputs = {} as ActionInputs;
		await generate(dir, inputs);
		expectMocksNotCalled();
	});

	it("index.htmlがあるとき、何もしない", async () => {
		const dir = { fullpath: () => "test/html" } as Path;
		const inputs = {} as ActionInputs;
		await generate(dir, inputs);
		expectMocksNotCalled();
	});

	it("index.htmlを生成する", async () => {
		const dir = { fullpath: () => "test" } as Path;
		const inputs = {} as ActionInputs;
		await generate(dir, inputs);
		expectMocksCalled(dir, "test/index.html");
	});

	it("override が true のとき、index.html を生成する", async () => {
		const dir = { fullpath: () => "test/html" } as Path;
		const inputs = { override: true } as ActionInputs;
		await generate(dir, inputs);
		expectMocksCalled(dir, "test/html/index.html");
	});

	it("ignore が設定されているとき、対象外のファイルを無視する", async () => {
		const dir = { fullpath: () => "test" } as Path;
		const inputs = { ignore: ["**/html", "**/secret", "**/*.txt", "**/*.md"] } as ActionInputs;
		await generate(dir, inputs);
		expectMocksNotCalled();
	});

	it("showHiddenFiles が true のとき、隠しファイルを表示する", async () => {
		const dir = { fullpath: () => "test" } as Path;
		const inputs = { showHiddenFiles: true, ignore: ["**/html", "**/secret", "**/*.txt", "**/*.md"] } as ActionInputs;
		await generate(dir, inputs);
		expectMocksCalled(dir, "test/index.html");
	});
});
