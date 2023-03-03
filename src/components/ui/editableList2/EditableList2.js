import { EditableText, Intent, Label } from "@blueprintjs/core";
import { useEffect, useRef, useState } from "react";
import styles from "./EditableList2.module.css";

const OVERFLOW_SPEED = 80;
const LABEL_WIDTH = 140;

const EditableList2 = props => {
	const spanRef = useRef(null);
	const [spanLength, setSpanLength] = useState(0);
	const [spanStyle, setSpanStyle] = useState({});
	useEffect(() => setSpanLength(spanRef.current.offsetWidth - LABEL_WIDTH), [props.label]);

	const labelOnMouseEnter = () => {
		let time = spanLength / OVERFLOW_SPEED;
		setSpanStyle({ transition: `left ${time}s linear`, left: `-${spanLength}px` });
	};

	const labelOnMouseLeave = () => {
		setSpanStyle({});
	};

	const saveValueHandler = newValue => {
		const lineLimitedValue = newValue.split("\n").slice(0, props.lines).join("\n");
		props.onSaveData(lineLimitedValue);
	};

	return (
		<div className={props.className}>
			{props.label && (
				<Label
					style={{ width: `${LABEL_WIDTH}px` }}
					className={props.labelClassName}
					onMouseEnter={labelOnMouseEnter}
					onMouseLeave={labelOnMouseLeave}>
					<span ref={spanRef} style={spanStyle}>
						{props.label}
					</span>
				</Label>
			)}
			<EditableText
				className={styles.editable}
				intent={props.isNotValid === true ? Intent.DANGER : Intent.NONE}
				maxLines={props.lines}
				minLines={props.lines}
				minWidth={0}
				multiline={true}
				placeholder={"Modificar"}
				selectAllOnFocus={true}
				value={props.value}
				onChange={saveValueHandler}
				disabled={props.disabled}
				ref={props.innerRef}
			/>
		</div>
	);
};

export default EditableList2;
