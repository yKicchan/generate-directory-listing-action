import color from "./color";

describe("color", () => {
	it("黒", () => {
		expect(color.black("test")).toBe("\x1b[30mtest\x1b[0m");
	});
	it("赤", () => {
		expect(color.red("test")).toBe("\x1b[31mtest\x1b[0m");
	});
	it("緑", () => {
		expect(color.green("test")).toBe("\x1b[32mtest\x1b[0m");
	});
	it("黄", () => {
		expect(color.yellow("test")).toBe("\x1b[33mtest\x1b[0m");
	});
	it("青", () => {
		expect(color.blue("test")).toBe("\x1b[34mtest\x1b[0m");
	});
	it("マゼンタ", () => {
		expect(color.magenta("test")).toBe("\x1b[35mtest\x1b[0m");
	});
	it("シアン", () => {
		expect(color.cyan("test")).toBe("\x1b[36mtest\x1b[0m");
	});
	it("白", () => {
		expect(color.white("test")).toBe("\x1b[37mtest\x1b[0m");
	});
});
