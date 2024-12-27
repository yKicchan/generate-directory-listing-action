import { beforeEach, expect } from "vitest";
import * as inputs from "../utils/inputs";
import type { ActionInputs } from "../utils/inputs";
import * as generator from "./generator";
import { run } from "./main";

const mockGetInputs = vi.spyOn(inputs, "getInputs");
const mockGenerate = vi.spyOn(generator, "generate");

const setup = (inputs: Partial<Pick<ActionInputs, "target" | "ignore">> = {}) => {
	mockGetInputs.mockReturnValue({
		target: "",
		ignore: [],
		showHiddenFiles: false,
		theme: "",
		override: false,
		...inputs,
	});
	mockGenerate.mockResolvedValue();
};

describe("run", () => {
	beforeEach(() => {
		mockGetInputs.mockClear();
		mockGenerate.mockClear();
	});

	it("ディレクトリの数だけ generate が呼ばれる", async () => {
		setup({ target: "test" });
		await run();
		expect(mockGenerate).toHaveBeenCalledTimes(5);
	});

	it("ディレクトリがないとき、generate は呼ばれない", async () => {
		setup({ target: "empty" });
		await run();
		expect(mockGenerate).not.toHaveBeenCalled();
	});
});
