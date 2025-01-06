import type { Path } from "glob";
import { ViewTypes } from "../../utils/view-types";
import { List } from "./list";
import { Table } from "./table";

export type P = ContentProps & {
	viewType: ViewTypes;
};

export type ContentProps = {
	files: Path[];
	isRoot: boolean;
};

export function Contents(props: P) {
	return (
		<main>
			<Switcher {...props} />
		</main>
	);
}

function Switcher({ viewType, ...contentProps }: P) {
	switch (viewType) {
		case ViewTypes.Table:
			return <Table {...contentProps} />;
		case ViewTypes.List:
			return <List {...contentProps} />;
		default:
			return <Table {...contentProps} />;
	}
}
