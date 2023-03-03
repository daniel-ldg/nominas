import { Button, ControlGroup, Intent, TextArea } from "@blueprintjs/core";
import FocusTrap from "focus-trap-react";
import { useEffect, useRef } from "react";
import Spacer from "../Spacer";

const EditMode = props => {
	const textAreaRef = useRef();

	const saveDataHandler = () => {
		props.onSaveNewData(textAreaRef.current.value);
		props.onExitEditMode();
	};

	useEffect(() => {
		textAreaRef.current.focus();
		textAreaRef.current.select();
	}, []);

	return (
		<FocusTrap>
			<div>
				<ControlGroup>
					<Button fill intent={Intent.PRIMARY} onClick={saveDataHandler}>
						Guardar
					</Button>
					<Button fill onClick={props.onExitEditMode}>
						Cancelar
					</Button>
				</ControlGroup>
				<Spacer height='15' />
				<ControlGroup>
					{props.for && (
						<TextArea
							rows={props.maxRows}
							style={{ resize: "none", whiteSpace: "pre" }}
							readOnly={true}
							defaultValue={props.for}
						/>
					)}
					<TextArea
						fill
						defaultValue={props.data}
						inputRef={textAreaRef}
						rows={props.maxRows}
						growVertically={props.growVertically || false}
						style={{ resize: "none", whiteSpace: "pre" }}
						spellCheck='false'
						autoComplete='false'
						autoCapitalize='false'
					/>
				</ControlGroup>
			</div>
		</FocusTrap>
	);
};

export default EditMode;
