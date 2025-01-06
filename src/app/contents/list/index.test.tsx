import fs from "node:fs";
import { render, screen, within } from "@testing-library/preact";
import type { Path } from "glob";
import { beforeEach, expect } from "vitest";
import type { ContentProps } from "../index";
import { List } from "./index";

const mockStatSync = vi.spyOn(fs, "statSync");

describe("List", () => {
	beforeEach(() => {
		mockStatSync.mockClear();
	});

	const setup = ({ files = [], isRoot = true }: Partial<ContentProps> = {}, stats: Partial<fs.Stats> = {}) => {
		mockStatSync.mockReturnValue({
			isFile: () => true,
			isDirectory: () => false,
			size: 1024,
			mtime: new Date("2000-01-01 00:00:00"),
			...stats,
		} as fs.Stats);

		return render(<List files={files} isRoot={isRoot} />);
	};

	describe("アイテムがファイルの時", () => {
		beforeEach(() => {
			const files = [
				{ name: "file1.txt", fullpath: () => "file1.txt", isDirectory: () => false },
				{ name: "file2.png", fullpath: () => "file2.png", isDirectory: () => false },
			] as Path[];

			setup({ files });
		});

		it("ul が表示される", () => {
			const ul = screen.getByRole("list");
			expect(ul).toBeVisible();
		});

		it("1つめのファイルが表示される", () => {
			const firstItem = screen.getAllByRole("listitem")[0];
			expect(firstItem).toBeVisible();
			expect(firstItem).toHaveAttribute("data-name", "file1.txt");
			expect(firstItem).toHaveAttribute("data-type", "txt");
			expect(within(firstItem).getByRole("link")).toHaveAttribute("href", "file1.txt");
		});

		it("2つめのファイルが表示される", () => {
			const secondItem = screen.getAllByRole("listitem")[1];
			expect(secondItem).toBeVisible();
			expect(secondItem).toHaveAttribute("data-name", "file2.png");
			expect(secondItem).toHaveAttribute("data-type", "png");
			expect(within(secondItem).getByRole("link")).toHaveAttribute("href", "file2.png");
		});
	});

	it("アイテムがディレクトリのとき、href と type がディレクトリ用になる", () => {
		const files = [{ name: "dir", fullpath: () => "dir1", isDirectory: () => true }] as Path[];

		const { getByRole } = setup({ files });

		const dir = getByRole("listitem");
		expect(dir).toHaveAttribute("data-type", "dir");
		expect(within(dir).getByRole("link")).toHaveAttribute("href", "dir/");
	});

	it("isRoot が true のとき、親ディレクトリへのリンクが表示されない", () => {
		const { queryByRole } = setup({ isRoot: true });
		expect(queryByRole("listitem")).toBeNull();
	});

	it("isRoot が false のとき、親ディレクトリへのリンクが表示される", () => {
		const { getByRole } = setup({ isRoot: false });
		const parent = getByRole("listitem");
		expect(parent).toHaveAttribute("data-name", "..");
		expect(parent).toHaveAttribute("data-type", "parent");
		expect(within(parent).getByRole("link")).toHaveAttribute("href", "../");
	});
});
