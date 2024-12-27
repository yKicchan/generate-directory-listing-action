import { generateHTML } from "./html";

describe("generateHtml", () => {
	it("引数の情報に置き換えて HTML が生成される", () => {
		const result = generateHTML("location", "css", "list");
		expect(result).toBe(/* html */ `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Index of location</title>
  css
</head>
<body>
  <h1>Index of location</h1>
  list
</body>
</html>
`);
	});
});
