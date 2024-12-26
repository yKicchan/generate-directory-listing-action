import type { Path } from "glob";
import { generateHTML } from "./html";

describe("generateHtml", () => {
	it("引数の情報に置き換えて HTML が生成される", () => {
		const dir = { parentPath: "parent/", name: "dir" } as Path;
		const result = generateHTML(dir, "css", "list");
		expect(result).toBe(/* html */ `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Index of dir</title>
  css
</head>
<body>
  <h1>Index of dir</h1>
  list
</body>
</html>
`);
	});
});
