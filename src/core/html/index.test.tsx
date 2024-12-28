import { render } from "@testing-library/preact";
import type { Path } from "glob";
import { expect } from "vitest";
import type { ActionInputs } from "../../utils/inputs";
import { HTML, type P } from "./index";

vi.mock("../css", () => ({ CSS: () => "css" }));
vi.mock("../../components/list", () => ({ List: () => "list" }));

describe("generateHtml", () => {
	const setup = async ({ root, dir, files, inputs }: Partial<P> = {}) => {
		const htmlComponent = await HTML({
			root: root ?? "",
			dir: dir ?? ({ fullpath: () => "" } as Path),
			files: files ?? [],
			inputs: inputs ?? ({} as ActionInputs),
		});
		return render(htmlComponent);
	};

	it("header, contents, footer が表示される", async () => {
		const { getByRole } = await setup();
		expect(getByRole("banner")).toBeVisible();
		expect(getByRole("main")).toBeVisible();
		expect(getByRole("contentinfo")).toBeVisible();
	});

	it("root のとき location は / になる", async () => {
		const dir = { fullpath: () => "sandbox" } as Path;
		const { getByRole } = await setup({ root: "sandbox", dir });
		expect(getByRole("banner")).toHaveTextContent("Index of /");
	});

	it("root 以外のとき location は root からの相対パスになる", async () => {
		const dir = { fullpath: () => "sandbox/path/to" } as Path;
		const { getByRole } = await setup({ root: "sandbox", dir });
		expect(getByRole("banner")).toHaveTextContent("Index of /path/to");
	});
});
