import type { Path } from "glob";
import { ViewTypes } from "../../utils/view-types";
import { Table } from "../table";

export interface P {
	files: Path[];
	viewType: ViewTypes;
}

export function Contents({ files, viewType }: P) {
	return (
		<main>
			<SwitchView files={files} viewType={viewType} />
		</main>
	);
}

function SwitchView({ files, viewType }: P) {
	switch (viewType) {
		case ViewTypes.Table:
			return <Table files={files} />;
		default:
			return <Table files={files} />;
	}
}
