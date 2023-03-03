import { Button, NonIdealState } from "@blueprintjs/core";
import ListView from "./ListView";

const ViewMode = props => {
	return (
		<>
			<Button fill onClick={props.onExitViewMode}>
				{props.modifyText || "Modificar"}
			</Button>
			{props.data === "" && (
				<NonIdealState
					layout={props.noIdealStateLayout || "vertical"}
					icon={props.noIdealStateIcon || "multi-select"}
					title={props.noIdealStateLabel || "Sin datos"}
				/>
			)}
			{props.data !== "" && <ListView data={props.data} isValid={props.isValid} />}
		</>
	);
};

export default ViewMode;
