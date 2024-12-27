import * as core from "@actions/core";
import { beforeEach } from "vitest";
import { type ActionInputs, getInputs } from "./inputs";
import { ViewTypes } from "./view-types";

type Environments = Partial<Record<keyof ActionInputs, string>>;
const mockGetInput = vi.spyOn(core, "getInput");
const setup = (environments?: Environments) =>
	mockGetInput.mockImplementation((name: string) => {
		switch (name) {
			case "target":
				return environments?.target ?? "test";
			case "ignore":
				return environments?.ignore ?? "";
			case "showHiddenFiles":
				return environments?.showHiddenFiles ?? "";
			case "theme":
				return environments?.theme ?? "";
			case "override":
				return environments?.override ?? "";
			case "viewType":
				return environments?.viewType ?? "";
			default:
				return "";
		}
	});

describe("getInputs", () => {
	beforeEach(() => {
		mockGetInput.mockClear();
	});

	it("target が指定されていない場合はエラーが発生する", () => {
		setup({ target: "" });
		expect(() => getInputs()).toThrowError();
	});

	it("target を取得できる", () => {
		setup({ target: "target" });
		const result = getInputs();
		expect(result.target).toBe("target");
	});

	it("ignore を取得できる", () => {
		setup({ ignore: "ignore" });
		const result = getInputs();
		expect(result.ignore).toEqual(["ignore"]);
	});

	it("カンマ区切りで複数の ignore を取得できる", () => {
		setup({ ignore: "ignore1, ignore2" });
		const result = getInputs();
		expect(result.ignore).toEqual(["ignore1", "ignore2"]);
	});

	it("ignore が指定されていない場合は空の配列が返る", () => {
		setup({ ignore: "" });
		const result = getInputs();
		expect(result.ignore).toEqual([]);
	});

	it("showHiddenFiles を取得できる", () => {
		setup({ showHiddenFiles: "true" });
		const result = getInputs();
		expect(result.showHiddenFiles).toBe(true);
	});

	it("showHiddenFiles が指定されていない場合は false が返る", () => {
		setup({ showHiddenFiles: "" });
		const result = getInputs();
		expect(result.showHiddenFiles).toBe(false);
	});

	it("theme を取得できる", () => {
		setup({ theme: "theme" });
		const result = getInputs();
		expect(result.theme).toBe("theme");
	});

	it("theme が指定されていない場合は空文字が返る", () => {
		setup({ theme: "" });
		const result = getInputs();
		expect(result.theme).toBe("");
	});

	it("override を取得できる", () => {
		setup({ override: "true" });
		const result = getInputs();
		expect(result.override).toBe(true);
	});

	it("override が指定されていない場合は false が返る", () => {
		setup({ override: "" });
		const result = getInputs();
		expect(result.override).toBe(false);
	});

	it("viewType を取得できる", () => {
		setup({ viewType: ViewTypes.Table });
		const result = getInputs();
		expect(result.viewType).toBe("TABLE");
	});

	it("viewType が指定されていない場合は TABLE が返る", () => {
		setup({ viewType: "" });
		const result = getInputs();
		expect(result.viewType).toBe("TABLE");
	});

	it("viewType は大文字になる", () => {
		setup({ viewType: "table" });
		const result = getInputs();
		expect(result.viewType).toBe("TABLE");
	});

	it("viewType が不正な場合はエラーが発生する", () => {
		setup({ viewType: "INVALID" });
		expect(() => getInputs()).toThrowError();
	});
});
