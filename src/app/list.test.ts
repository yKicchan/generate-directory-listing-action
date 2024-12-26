import type { Path } from "glob";
import * as module from "./list";

describe("generateList", () => {
	const mockGenerateListItem = vi.spyOn(module, "generateListItem");
	const files = [
		{ isDirectory: () => false, name: "file.txt" },
		{ isDirectory: () => true, name: "dir" },
	] as Path[];

	it("ファイルが2つのとき、generateListItem が２回呼ばれリストが生成される", () => {
		mockGenerateListItem.mockReturnValueOnce("test1").mockReturnValueOnce("test2");
		const result = module.generateList(files);
		expect(mockGenerateListItem).toHaveBeenCalledTimes(2);
		expect(result).toBe("<ul>\n    test1\n    test2\n  </ul>");
	});

	it("ファイルがないとき、空文字列が返る", () => {
		const result = module.generateList([]);
		expect(result).toBe("");
	});
});

describe("generateListItem", () => {
	it("ファイル情報からリストアイテムが生成される", () => {
		const path = { isDirectory: () => false, name: "file.txt" } as Path;
		const result = module.generateListItem(path);
		expect(result).toBe('<li><a href="file.txt" data-name="file.txt" data-type="txt">file.txt</a></li>');
	});

	it("ディレクトリのとき、スラッシュが付与され、type が dir になる", () => {
		const path = { isDirectory: () => true, name: "dir" } as Path;
		const result = module.generateListItem(path);
		expect(result).toBe('<li><a href="dir/" data-name="dir" data-type="dir">dir</a></li>');
	});

	it("拡張子のないファイルのとき、type がファイル名になる", () => {
		const path = { isDirectory: () => false, name: "file" } as Path;
		const result = module.generateListItem(path);
		expect(result).toBe('<li><a href="file" data-name="file" data-type="file">file</a></li>');
	});

	it("ドットが複数あるファイルのとき、最後のドット以降が type になる", () => {
		const path = { isDirectory: () => false, name: "file.name.txt" } as Path;
		const result = module.generateListItem(path);
		expect(result).toBe('<li><a href="file.name.txt" data-name="file.name.txt" data-type="txt">file.name.txt</a></li>');
	});
});
