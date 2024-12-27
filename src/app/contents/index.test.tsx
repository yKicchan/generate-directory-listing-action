import { render } from "@testing-library/preact";
import type { Path } from "glob";
import { ViewTypes } from "../../utils/view-types";
import { Contents, type P } from "./index";

describe("Contents", () => {
	const setup = ({ files, viewType }: Partial<P> = {}) =>
		render(<Contents files={files ?? []} viewType={viewType ?? ViewTypes.Table} />);

	it("contents が表示される", () => {
		const { getByRole } = setup();
		expect(getByRole("main")).toBeVisible();
	});

	it("viewType が Table の場合、table が表示される", () => {
		const files = [{ name: "test", isDirectory: () => false }] as Path[];
		const { getByRole } = setup({ files, viewType: ViewTypes.Table });
		expect(getByRole("table")).toBeVisible();
	});
});
