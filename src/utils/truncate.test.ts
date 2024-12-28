import { truncate } from "./truncate";

describe("truncate", () => {
	it("文字列が指定した長さで切り詰められる", () => {
		const result = truncate("1234567890", 5);
		expect(result).toBe("12345...");
	});

	it("文字列が指定した長さ以下の場合はそのまま返る", () => {
		const result = truncate("1234", 5);
		expect(result).toBe("1234");
	});

	it("文字列の長さがちょうど指定の長さの場合はそのまま返る", () => {
		const result = truncate("12345", 5);
		expect(result).toBe("12345");
	});

	it("空文字列の場合はそのまま返る", () => {
		const result = truncate("", 5);
		expect(result).toBe("");
	});

	it("長さが0の場合は常に '...' が返る", () => {
		const result = truncate("12345", 0);
		expect(result).toBe("...");
	});

	it("負の長さが指定された場合はエラーを投げる", () => {
		expect(() => truncate("12345", -1)).toThrow("Length must be non-negative");
	});
});
