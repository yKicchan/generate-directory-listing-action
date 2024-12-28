import fs from "node:fs";
import { join } from "node:path";
import { glob } from "glob";
import { beforeEach, describe } from "vitest";
import { getDirSize, getDirectories } from "./directories";

describe("getDirectories", () => {
	it("target を含めた配下のディレクトリ一覧が取得できる", async () => {
		const result = await getDirectories("sandbox", []);
		expect(result.directories).toHaveLength(5);
	});

	it("ignore で指定したディレクトリ以下を除外できる", async () => {
		const result = await getDirectories("sandbox", ["path"]);
		expect(result.directories).toHaveLength(3);
	});

	it("target が存在しない場合は空が返る", async () => {
		const result = await getDirectories("not-exist", []);
		expect(result.directories).toHaveLength(0);
	});

	it("target のパスが root で返る", async () => {
		const result = await getDirectories("sandbox", []);
		expect(result.root).toBe(join(process.cwd(), "sandbox"));
	});
});

const mockGlobSync = vi.spyOn(glob, "sync");
const mockStatSync = vi.spyOn(fs, "statSync");

describe("getDirSize", () => {
	beforeEach(() => {
		mockGlobSync.mockClear();
		mockStatSync.mockClear();
		mockGlobSync.mockReturnValue(["sandbox/file1.txt", "sandbox/file2.txt"]);
		mockStatSync.mockReturnValue({ size: 1024 } as fs.Stats);
	});

	it("ディレクトリ配下のファイルサイズの合計が取得できる", () => {
		const size = getDirSize("sandbox");
		expect(size).toBe(2048);
	});
});
