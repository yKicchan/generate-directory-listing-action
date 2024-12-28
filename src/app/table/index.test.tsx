import fs from "node:fs";
import { render, screen, within } from "@testing-library/preact";
import type { Path } from "glob";
import { beforeEach, describe, expect } from "vitest";
import { type P, Table } from "./index";

const mockStatSync = vi.spyOn(fs, "statSync");

describe("Table", () => {
	beforeEach(() => {
		mockStatSync.mockClear();
	});

	const setup = ({ files }: P) => render(<Table files={files} />);

	describe("アイテムがファイルの時", () => {
		beforeEach(() => {
			mockStatSync.mockReturnValue({
				isFile: () => true,
				isDirectory: () => false,
				size: 1024,
				mtime: new Date("2000-01-01 00:00:00"),
			} as fs.Stats);

			const files = [
				{ name: "file1.txt", fullpath: () => "file1.txt" },
				{ name: "file2.png", fullpath: () => "file2.png" },
			] as Path[];
			const screen = setup({ files });
		});

		it("table が表示される", () => {
			const table = screen.getByRole("table");
			expect(table).toBeVisible();
		});

		it("table header が表示される", () => {
			const rows = screen.getAllByRole("row");
			// rows + header = 3
			expect(rows).toHaveLength(3);

			const header = rows[0];
			expect(header).toBeVisible();
			expect(header).toHaveTextContent("Name");
			expect(header).toHaveTextContent("Size");
			expect(header).toHaveTextContent("Last Modified");
		});

		it("1つめのファイルが表示される", () => {
			const firstItem = screen.getAllByRole("row")[1];
			expect(firstItem).toBeVisible();
			expect(firstItem).toHaveAttribute("data-name", "file1.txt");
			expect(firstItem).toHaveAttribute("data-type", "txt");
			expect(within(firstItem).getByRole("link")).toHaveAttribute("href", "file1.txt");
			expect(within(firstItem).getByText("1KB")).toBeVisible();
			expect(within(firstItem).getByText("1/1/2000, 12:00:00 AM")).toBeVisible();
		});

		it("2つめのファイルが表示される", () => {
			const secondItem = screen.getAllByRole("row")[2];
			expect(secondItem).toBeVisible();
			expect(secondItem).toHaveAttribute("data-name", "file2.png");
			expect(secondItem).toHaveAttribute("data-type", "png");
			expect(within(secondItem).getByRole("link")).toHaveAttribute("href", "file2.png");
			expect(within(secondItem).getByText("1KB")).toBeVisible();
			expect(within(secondItem).getByText("1/1/2000, 12:00:00 AM")).toBeVisible();
		});
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
