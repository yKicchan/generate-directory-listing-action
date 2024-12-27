import { render } from "@testing-library/preact";
import type { Path } from "glob";
import { expect } from "vitest";
import type { ActionInputs } from "../../utils/inputs";
import { HTML, type P } from "./index";

vi.mock("../css", () => ({ CSS: () => "css" }));
vi.mock("../../components/list", () => ({ List: () => "list" }));

describe("generateHtml", () => {
	const setup = ({ root, dir, inputs }: P) => render(HTML({ root, dir, inputs }));

	it("root のとき location は / になる", () => {
		const dir = { fullpath: () => "test" } as Path;
		const inputs = {} as ActionInputs;
		const { getByRole } = setup({ root: "test", dir, inputs });
		expect(getByRole("heading")).toHaveTextContent("Index of /");
	});

	it("root 以外のとき location は root からの相対パスになる", () => {
		const dir = { fullpath: () => "test/path/to" } as Path;
		const inputs = {} as ActionInputs;
		const { getByRole } = setup({ root: "test", dir, inputs });
		expect(getByRole("heading")).toHaveTextContent("Index of /path/to");
	});
});
