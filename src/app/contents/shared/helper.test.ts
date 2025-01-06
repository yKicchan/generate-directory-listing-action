import fs from "node:fs";
import type { Path } from "glob";
import { describe } from "vitest";
import * as dirs from "../../../utils/directories";
import { getExt, getHref, getLastModified, getSize } from "./helper";

describe("getHref", () => {
	it("ディレクトリの時、href がディレクトリ用になる", () => {
		const path = { name: "dir", isDirectory: () => true } as Path;
		expect(getHref(path)).toBe("dir/");
	});

	it("ファイルの時、href がファイル用になる", () => {
		const path = { name: "file.txt", isDirectory: () => false } as Path;
		expect(getHref(path)).toBe("file.txt");
	});
});

describe("getExt", () => {
	it("ディレクトリの時、type がディレクトリ用になる", () => {
		const path = { name: "dir", isDirectory: () => true } as Path;
		expect(getExt(path)).toBe("dir");
	});

	it("ファイルの時、type が拡張子になる", () => {
		const path = { name: "file.txt", isDirectory: () => false } as Path;
		expect(getExt(path)).toBe("txt");
	});
});

describe("getSize", () => {
	it("ファイルの時、ファイルサイズが返される", () => {
		const path = { name: "file.txt", fullpath: () => "file.txt" } as Path;
		const file = { isFile: () => true, size: 1024 } as fs.Stats;
		vi.spyOn(fs, "statSync").mockReturnValue(file);

		expect(getSize(path)).toBe("1KB");
	});

	it("ディレクトリの時、ディレクトリサイズが返される", () => {
		const path = { name: "dir", fullpath: () => "dir" } as Path;
		const file = { isFile: () => false, isDirectory: () => true } as fs.Stats;
		vi.spyOn(fs, "statSync").mockReturnValue(file);
		vi.spyOn(dirs, "getDirSize").mockReturnValue(0);

		expect(getSize(path)).toBe("0B");
	});
});

describe("getLastModified", () => {
	it("最終更新日時が返される", () => {
		const path = { name: "file.txt", fullpath: () => "file.txt" } as Path;
		const file = { mtime: new Date("2000-01-01 00:00:00") } as fs.Stats;
		vi.spyOn(fs, "statSync").mockReturnValue(file);

		expect(getLastModified(path)).toBe("1/1/2000, 12:00:00 AM");
	});
});
