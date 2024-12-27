import { getByRole, render } from "@testing-library/preact";
import { Footer } from "./index";

describe("Footer", () => {
	const setup = () => render(<Footer />);

	it("footer が表示される", () => {
		const screen = setup();
		expect(screen.getByRole("contentinfo")).toBeVisible();
	});

	it("リポジトリのリンクが表示される", () => {
		const screen = setup();
		const link = screen.getByRole("link");
		expect(link).toBeVisible();
		expect(link).toHaveAttribute("href", "https://github.com/yKicchan/generate-directory-listing-action");
	});
});
