import { render } from "@testing-library/preact";
import type { Path } from "glob";
import { expect } from "vitest";
import type { ActionInputs } from "../../utils/inputs";
import { HTML, type P } from "./index";

vi.mock("../css", () => ({ CSS: () => "css" }));
vi.mock("../../components/list", () => ({ List: () => "list" }));

describe("generateHtml", () => {
	const setup = ({ root, dir, files, inputs }: Partial<P> = {}) =>
		render(
			HTML({
				root: root ?? "",
				dir: dir ?? ({ fullpath: () => "" } as Path),
				files: files ?? [],
				inputs: inputs ?? ({} as ActionInputs),
			}),
		);

	it("header, contents, footer が表示される", () => {
		const { getByRole } = setup();
		expect(getByRole("banner")).toBeVisible();
		expect(getByRole("main")).toBeVisible();
		expect(getByRole("contentinfo")).toBeVisible();
	});

	it("root のとき location は / になる", () => {
		const dir = { fullpath: () => "test" } as Path;
		const { getByRole } = setup({ root: "test", dir });
		expect(getByRole("banner")).toHaveTextContent("Index of /");
	});

	it("root 以外のとき location は root からの相対パスになる", () => {
		const dir = { fullpath: () => "test/path/to" } as Path;
		const { getByRole } = setup({ root: "test", dir });
		expect(getByRole("banner")).toHaveTextContent("Index of /path/to");
	});
});
