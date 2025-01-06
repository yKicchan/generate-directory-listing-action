import { render } from "@testing-library/preact";
import { ViewTypes } from "../../utils/view-types";
import { Contents, type P } from "./index";

describe("Contents", () => {
	const setup = (props: Partial<P> = {}) =>
		render(<Contents {...{ files: [], isRoot: true, viewType: ViewTypes.Table, ...props }} />);

	it("contents が表示される", () => {
		const { getByRole } = setup();
		expect(getByRole("main")).toBeVisible();
	});

	it("viewType が Table の場合、table が表示される", () => {
		const { getByRole } = setup({ viewType: ViewTypes.Table });
		expect(getByRole("table")).toBeVisible();
	});
});
