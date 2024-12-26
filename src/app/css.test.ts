import * as module from "./css";

describe("generateCSS", () => {
	const mockGenerateStyle = vi.spyOn(module, "generateStyle");

	it("theme がないとき、デフォルトの css を使って generateStyle が呼ばれる", async () => {
		await module.generateCSS("", undefined);
		expect(mockGenerateStyle).toHaveBeenCalledWith(module.css);
	});

	it("theme があるとき、theme の css を使って generateStyle が呼ばれる", async () => {
		await module.generateCSS("src", "../test/theme.txt");
		expect(mockGenerateStyle).toHaveBeenCalledWith(module.css, "test theme");
	});

	it("無効な theme が指定されたとき、無視してデフォルトの css を使って generateStyle が呼ばれる", async () => {
		await module.generateCSS("src", "../test/unknown.css");
		expect(mockGenerateStyle).toHaveBeenCalledWith(module.css);
	});
});

describe("generateStyle", () => {
	it("引数の css を style タグで囲んで返す", () => {
		const result = module.generateStyle("css");
		expect(result).toBe(`<style type="text/css">css</style>`);
	});

	it("複数の css を style タグで囲んで返す", () => {
		const result = module.generateStyle("css", "theme");
		expect(result).toBe(`<style type="text/css">css</style>\n<style type="text/css">theme</style>`);
	});
});
