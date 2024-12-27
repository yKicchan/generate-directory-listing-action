import * as app from "./core/main";

// 実際に書き込まれないようモックしておく
vi.mock("node:fs", async (importOriginal) => {
	const fs = await importOriginal<typeof import("node:fs")>();
	return {
		...fs,
		promises: {
			...fs.promises,
			writeFile: vi.fn(),
		},
	};
});

const mockRun = vi.spyOn(app, "run");

describe("index", () => {
	it("run が呼ばれる", async () => {
		await import("./index.js");
		expect(mockRun).toHaveBeenCalled();
	});
});
