export const ViewTypes = {
	Table: "TABLE",
	List: "LIST",
} as const;
export type ViewTypes = (typeof ViewTypes)[keyof typeof ViewTypes];

export function isViewType(value: string): value is ViewTypes {
	return Object.values(ViewTypes).includes(value);
}
