import { render } from "@testing-library/preact";
import { describe, expect } from "vitest";
import { CSS } from "./index";

vi.mock("../../assets/global.pcss", () => ({
	default: 'html{content:"base"}',
}));

describe("CSS", () => {
	const setup = async (target = "", theme = "") => {
		const cssComponent = await CSS({ target, theme });
		return render(cssComponent);
	};

	it("theme がないとき、デフォルトの css のみレンダリングされる", async () => {
		const { container } = await setup();
		console.log(container.innerHTML);
		expect(container.innerHTML).toBe('<style>html{content:"base"}</style>');
	});

	it("theme があるとき、theme の css が追加される", async () => {
		const { container } = await setup("src", "../sandbox/theme.css");
		expect(container.innerHTML).toBe('<style>html{content:"base"}</style><style>html{content:"theme"}</style>');
	});

	it("無効な theme が指定されたとき、無視してデフォルトの css のみレンダリングされる", async () => {
		const { container } = await setup("src", "unknown.css");
		console.log(container.innerHTML);
		expect(container.innerHTML).toBe('<style>html{content:"base"}</style>');
	});
});
