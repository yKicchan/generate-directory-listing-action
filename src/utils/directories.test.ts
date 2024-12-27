import { join } from "node:path";
import { describe } from "vitest";
import { getDirectories } from "./directories";

describe("getDirectories", () => {
	it("target を含めた配下のディレクトリ一覧が取得できる", async () => {
		const result = await getDirectories("test", []);
		expect(result.directories).toHaveLength(5);
	});

	it("ignore で指定したディレクトリを除外できる", async () => {
		const result = await getDirectories("test", ["**/path/to"]);
		expect(result.directories).toHaveLength(4);
	});

	it("target が存在しない場合は空が返る", async () => {
		const result = await getDirectories("not-exist", []);
		expect(result.directories).toHaveLength(0);
	});

	it("target のパスが root で返る", async () => {
		const result = await getDirectories("test", []);
		expect(result.root).toBe(join(process.cwd(), "test"));
	});
});
