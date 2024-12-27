import { render } from "@testing-library/preact";
import { expect } from "vitest";
import { ViewTypes } from "../utils/view-types";
import { App, type P } from "./index";

describe("App", () => {
	const setup = ({ location, viewType, files }: Partial<P> = {}) =>
		render(<App location={location || ""} viewType={viewType || ViewTypes.Table} files={files || []} />);

	it("header, contents, footer が表示される", () => {
		const { getByRole } = setup();
		expect(getByRole("banner")).toBeVisible();
		expect(getByRole("main")).toBeVisible();
		expect(getByRole("contentinfo")).toBeVisible();
	});
});
