import fs from "node:fs";
import { render, within } from "@testing-library/preact";
import type { Path } from "glob";
import { beforeEach, describe, expect } from "vitest";
import { type P, Table } from "./index";

const mockStatSync = vi.spyOn(fs, "statSync");

describe("Table", () => {
	beforeEach(() => {
		mockStatSync.mockClear();
	});

	const setup = ({ files }: P) => render(<Table files={files} />);

	it("files があるとき、table が生成される", () => {
		mockStatSync.mockReturnValue({
			isFile: () => true,
			isDirectory: () => false,
			size: 1024,
			mtime: new Date("2000-01-01"),
		} as fs.Stats);

		const files = [
			{ name: "file1.txt", fullpath: () => "file1.txt" },
			{ name: "file2.png", fullpath: () => "file2.png" },
		] as Path[];
		const screen = setup({ files });

		expect(screen.getByRole("table")).toBeVisible();
		const rows = screen.getAllByRole("row");
		// rows + header = 3
		expect(rows).toHaveLength(3);

		const header = rows[0];
		expect(header).toBeVisible();
		expect(header).toHaveTextContent("Name");
		expect(header).toHaveTextContent("Size");
		expect(header).toHaveTextContent("Last Modified");

		const firstItem = rows[1];
		expect(firstItem).toBeVisible();
		expect(firstItem).toHaveAttribute("data-name", "file1.txt");
		expect(firstItem).toHaveAttribute("data-type", "txt");
		expect(within(firstItem).getByRole("link")).toHaveAttribute("href", "file1.txt");

		const secondItem = rows[2];
		expect(secondItem).toBeVisible();
		expect(secondItem).toHaveAttribute("data-name", "file2.png");
		expect(secondItem).toHaveAttribute("data-type", "png");
		expect(within(secondItem).getByRole("link")).toHaveAttribute("href", "file2.png");
	});

	it("アイテムがディレクトリのとき、href と type がディレクトリ用になる", () => {
		mockStatSync.mockReturnValue({
			isFile: () => false,
			isDirectory: () => true,
			size: 1024,
			mtime: new Date("2000-01-01"),
		} as fs.Stats);

		const paths = [{ name: "dir", fullpath: () => "dir" }] as Path[];
		const { getAllByRole } = setup({ files: paths });

		const dir = getAllByRole("row")[1];
		expect(dir).toHaveAttribute("data-type", "dir");
		expect(within(dir).getByRole("link")).toHaveAttribute("href", "dir/");
	});
});
