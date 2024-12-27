import { render } from "@testing-library/preact";
import { describe, expect } from "vitest";
import { CSS } from "../css";
import "./index.css";

vi.mock("./index.css", () => ({
	default: "css",
}));

describe("CSS", () => {
	const setup = (target = "", theme = "") => render(<CSS target={target} theme={theme} />);

	it("theme がないとき、デフォルトの css のみレンダリングされる", async () => {
		const { container } = setup();
		console.log(container.innerHTML);
		expect(container.innerHTML).toBe("<style>css</style>");
	});

	it("theme があるとき、theme の css が追加される", async () => {
		const { container } = setup("src", "../test/theme.txt");
		expect(container.innerHTML).toBe("<style>css</style><style>theme</style>");
	});

	it("無効な theme が指定されたとき、無視してデフォルトの css のみレンダリングされる", async () => {
		const { container } = setup("src", "unknown.txt");
		console.log(container.innerHTML);
		expect(container.innerHTML).toBe("<style>css</style>");
	});
});
