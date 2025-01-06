import fs from "node:fs";
import bytes from "bytes";
import type { Path } from "glob";
import { getDirSize } from "../../../utils/directories";

export function getHref(path: Path) {
	return path.isDirectory() ? `${path.name}/` : path.name;
}

export function getExt(path: Path) {
	return path.isDirectory() ? "dir" : (path.name.split(".").pop() ?? "");
}

export function getSize(path: Path) {
	const file = fs.statSync(path.fullpath());
	const size = file.isFile() ? file.size : file.isDirectory() ? getDirSize(path.fullpath()) : 0;
	return bytes(size) ?? "-";
}

export function getLastModified(path: Path) {
	const file = fs.statSync(path.fullpath());
	return file.mtime.toLocaleString();
}
