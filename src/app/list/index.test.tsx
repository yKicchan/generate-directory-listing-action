import { render, within } from "@testing-library/preact";
import type { Path } from "glob";
import { describe, expect } from "vitest";
import { List, type P } from "./index";

describe("List", () => {
	const setup = ({ files }: P) => render(<List files={files} />);

	it("files があるとき、リストが生成される", () => {
		const files = [
			{ name: "file1.txt", isDirectory: () => false },
			{ name: "file2.png", isDirectory: () => false },
		] as Path[];
		const screen = setup({ files });

		expect(screen.getByRole("list")).toBeVisible();
		expect(screen.getAllByRole("listitem")).toHaveLength(2);

		const firstItem = screen.getByText("file1.txt");
		expect(firstItem).toBeVisible();
		expect(firstItem).toHaveAttribute("href", "file1.txt");
		expect(firstItem).toHaveAttribute("data-name", "file1.txt");
		expect(firstItem).toHaveAttribute("data-type", "txt");

		const secondItem = screen.getByText("file2.png");
		expect(secondItem).toBeVisible();
		expect(secondItem).toHaveAttribute("href", "file2.png");
		expect(secondItem).toHaveAttribute("data-name", "file2.png");
		expect(secondItem).toHaveAttribute("data-type", "png");
	});

	it("paths がないとき、list は表示されない", () => {
		const paths = [] as Path[];
		const { queryByRole } = setup({ files: paths });
		expect(queryByRole("list")).toBeNull();
	});

	it("ディレクトリのとき、href と type がディレクトリ用になる", () => {
		const paths = [{ name: "dir", isDirectory: () => true }] as Path[];
		const { getByText } = setup({ files: paths });

		const dir = getByText("dir");
		expect(dir).toHaveAttribute("href", "dir/");
		expect(dir).toHaveAttribute("data-type", "dir");
	});
});
