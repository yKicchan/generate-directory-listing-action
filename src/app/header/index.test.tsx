import { render } from "@testing-library/preact";
import { Header, type P } from "./index";

describe("Header", () => {
	const setup = ({ location }: Partial<P> = {}) => render(<Header location={location || ""} />);

	it("header が表示される", () => {
		const { getByRole } = setup();
		expect(getByRole("banner")).toBeVisible();
	});

	it("location が表示される", () => {
		const { getByRole } = setup({ location: "test" });
		expect(getByRole("heading")).toHaveTextContent("Index of test");
	});
});
