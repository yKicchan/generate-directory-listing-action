import { describe } from "vitest";
import * as module from "./css";

describe("generateCSS", () => {
	const mockGenerateStyle = vi.spyOn(module, "generateStyle");

	it("theme がないとき、デフォルトの css を使って generateStyle が呼ばれる", async () => {
		await module.generateCSS("", "");
		expect(mockGenerateStyle).toHaveBeenCalledWith(module.styles);
	});

	it("theme があるとき、theme の css を使って generateStyle が呼ばれる", async () => {
		await module.generateCSS("src", "../test/theme.txt");
		expect(mockGenerateStyle).toHaveBeenCalledWith(module.styles, "test theme");
	});

	it("無効な theme が指定されたとき、無視してデフォルトの css を使って generateStyle が呼ばれる", async () => {
		await module.generateCSS("src", "../test/unknown.css");
		expect(mockGenerateStyle).toHaveBeenCalledWith(module.styles);
	});
});

describe("generateStyle", () => {
	it("引数の css を style タグで囲んで返す", () => {
		const result = module.generateStyle("css");
		expect(result).toBe("<style>css</style>");
	});

	it("複数の css を style タグで囲んで返す", () => {
		const result = module.generateStyle("css", "theme");
		expect(result).toBe("<style>css</style>\n<style>theme</style>");
	});
});

describe("css", () => {
	it("テンプレートリテラルの文字列を返す", () => {
		const result = module.css`h1 { color: red; }`;
		expect(result).toBe("h1 { color: red; }");
	});

	it("テンプレートリテラルの変数を展開して文字列を返す", () => {
		const color = "red";
		const result = module.css`h1 { color: ${color}; }`;
		expect(result).toBe("h1 { color: red; }");
	});
});
