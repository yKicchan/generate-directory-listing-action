import * as core from "@actions/core";

const template = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Index of {{location}}</title>
  {{css}}
</head>
<body>
  <h1>Index of {{location}}</h1>
  {{list}}
</body>
</html>
`;

export function generateHTML(location: string, css: string, list: string) {
	const result = template.replaceAll("{{location}}", location).replace("{{css}}", css).replace("{{list}}", list);
	core.debug(`- Generated ${location}/index.html: ${result}`);
	return result;
}
