import * as core from "@actions/core";
import type { Path } from "glob";

export function generateList(files: Path[]) {
  const links = files.map(generateListItem).join("\n    ");
  core.debug(`- Generated list: ${files.map((path) => path.name).join(", ")}`);

  return /* html */ `<ul>
    ${links}
  </ul>`;
}

export function generateListItem(path: Path) {
  const href = path.isDirectory() ? `${path.name}/` : path.name;
  const ext = path.isDirectory() ? "dir" : path.name.split(".").pop();
  return /* html */ `<li><a href="${href}" data-name="${path.name}" data-type="${ext}">${path.name}</a></li>`;
}
