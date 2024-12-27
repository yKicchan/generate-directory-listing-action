import fs from "node:fs";
import { join } from "node:path";
import { glob } from "glob";
import { beforeEach, describe } from "vitest";
import { getDirSize, getDirectories } from "./directories";

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

const mockGlobSync = vi.spyOn(glob, "sync");
const mockStatSync = vi.spyOn(fs, "statSync");

describe("getDirSize", () => {
	beforeEach(() => {
		mockGlobSync.mockClear();
		mockStatSync.mockClear();
		mockGlobSync.mockReturnValue(["test/file1.txt", "test/file2.txt"]);
		mockStatSync.mockReturnValue({ size: 1024 } as fs.Stats);
	});

	it("ディレクトリ配下のファイルサイズの合計が取得できる", () => {
		const size = getDirSize("test");
		expect(size).toBe(2048);
	});
});
