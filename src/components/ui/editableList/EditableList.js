import { Card, Label } from "@blueprintjs/core";
import { useState } from "react";
import EditMode from "./EditMode";
import ViewMode from "./ViewMode";

const EditableList = props => {
	const [isOnEditMode, setIsOnEditMode] = useState(false);

	const enableEditMode = () => setIsOnEditMode(true);
	const enableViewMode = () => setIsOnEditMode(false);

	return (
		<Card>
			{props.label && <Label>{props.label}</Label>}
			{isOnEditMode && (
				<EditMode
					onExitEditMode={enableViewMode}
					onSaveNewData={props.onSetData}
					data={props.data}
					growVertically={props.growVertically}
					dataName={props.dataName}
					maxRows={props.maxRows}
					for={props.for}
				/>
			)}
			{!isOnEditMode && (
				<ViewMode
					onExitViewMode={enableEditMode}
					data={props.data}
					noIdealStateLabel={props.noIdealStateLabel}
					noIdealStateLayout={props.noIdealStateLayout}
					noIdealStateIcon={props.noIdealStateIcon}
					isValid={props.isValid}
				/>
			)}
		</Card>
	);
};

export default EditableList;
