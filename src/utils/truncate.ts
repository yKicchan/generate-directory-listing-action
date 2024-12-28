export function truncate(str: string, length = 500): string {
	if (length < 0) throw new Error("Length must be non-negative");
	return str.length > length ? `${str.slice(0, length)}...` : str;
}
