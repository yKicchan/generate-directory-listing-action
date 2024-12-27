import { promises } from "node:fs";
import type { Path } from "glob";
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
	const expectMocksCalled = (location: string, out: string) => {
		expect(mockGenerateList).toHaveBeenCalled();
		expect(mockGenerateCSS).toHaveBeenCalled();
		expect(mockGenerateHTML).toHaveBeenCalledWith(location, "css", "list");
		expect(mockWriteFile).toHaveBeenCalledWith(out, "html", "utf-8");
	};

	it("ファイルがなかったとき、何もしない", async () => {
		const dir = { fullpath: () => "unknown" } as Path;
		const inputs = {} as ActionInputs;
		await generate("", dir, inputs);
		expectMocksNotCalled();
	});

	it("index.htmlがあるとき、何もしない", async () => {
		const dir = { fullpath: () => "test/html" } as Path;
		const inputs = {} as ActionInputs;
		await generate("", dir, inputs);
		expectMocksNotCalled();
	});

	it("index.htmlを生成する", async () => {
		const dir = { fullpath: () => "test" } as Path;
		const inputs = {} as ActionInputs;
		await generate("", dir, inputs);
		expectMocksCalled(dir.fullpath(), "test/index.html");
	});

	it("override が true のとき、index.html を生成する", async () => {
		const dir = { fullpath: () => "test/html" } as Path;
		const inputs = { override: true } as ActionInputs;
		await generate("", dir, inputs);
		expectMocksCalled(dir.fullpath(), "test/html/index.html");
	});

	it("ignore が設定されているとき、対象外のファイルを無視する", async () => {
		const dir = { fullpath: () => "test/path" } as Path;
		const inputs = { ignore: ["**/to"] } as ActionInputs;
		await generate("", dir, inputs);
		expectMocksNotCalled();
	});

	it("showHiddenFiles が false のとき、隠しファイルを無視する", async () => {
		const dir = { fullpath: () => "test/ignore" } as Path;
		const inputs = { showHiddenFiles: false } as ActionInputs;
		await generate("", dir, inputs);
		expectMocksNotCalled();
	});

	it("showHiddenFiles が true のとき、隠しファイルを表示する", async () => {
		const dir = { fullpath: () => "test/ignore" } as Path;
		const inputs = { showHiddenFiles: true } as ActionInputs;
		await generate("", dir, inputs);
		expectMocksCalled(dir.fullpath(), "test/ignore/index.html");
	});

	it("root のとき location は / になる", async () => {
		const dir = { fullpath: () => "test" } as Path;
		const inputs = {} as ActionInputs;
		await generate("test", dir, inputs);
		expectMocksCalled("/", "test/index.html");
	});

	it("root 以外のとき location は root からの相対パスになる", async () => {
		const dir = { fullpath: () => "test/path/to" } as Path;
		const inputs = {} as ActionInputs;
		await generate("test", dir, inputs);
		expectMocksCalled("/path/to", "test/path/to/index.html");
	});
});
