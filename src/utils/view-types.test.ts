import { isViewType } from "./view-types";

describe("isViewType", () => {
	it.each(["TABLE", "LIST"])("%s のとき true を返す", () => {
		expect(isViewType("TABLE")).toBe(true);
	});

	it("大文字小文字を区別する", () => {
		expect(isViewType("table")).toBe(false);
	});

	it("存在しない値のとき false を返す", () => {
		expect(isViewType("INVALID")).toBe(false);
	});
});
