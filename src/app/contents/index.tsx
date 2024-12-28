import { ViewTypes } from "../../utils/view-types";
import { Table, type P as TableProps } from "../table";

export type P = TableProps & {
	viewType: ViewTypes;
};

export function Contents(props: P) {
	return (
		<main>
			<SwitchView {...props} />
		</main>
	);
}

function SwitchView({ viewType, ...tableProps }: P) {
	switch (viewType) {
		case ViewTypes.Table:
			return <Table {...tableProps} />;
		default:
			return <Table {...tableProps} />;
	}
}
