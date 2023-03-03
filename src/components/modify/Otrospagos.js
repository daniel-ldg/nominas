import { EditableText, H5, Label, NonIdealState, NonIdealStateIconSize } from "@blueprintjs/core";
import EditableList2 from "../ui/editableList2/EditableList2";
import styles from "./Modify.module.css";

const Otrospagos = props => {
	const showOtrospagos = props.otrospagos !== undefined && props.otrospagos.length !== 0;

	return (
		<>
			<H5 style={{ marginTop: "20px" }}>Otros pagos</H5>
			<div className={styles.mainContainer}>
				<div className={styles.rfc}>
					<Label>Nóminas</Label>
					<EditableText
						className={styles.mono}
						disabled={true}
						value={props.for.reduce((prev, curr, i) => prev + (i !== 0 ? "\n" : "") + curr.rfc, "")}
						multiline={true}
						maxLines={props.for.length || 1}
						minLines={props.for.length || 1}
					/>
				</div>
				<div className={styles.container}>
					{!showOtrospagos && (
						<NonIdealState
							icon='th-disconnect'
							title='No hay otros pagos'
							layout='horizontal'
							iconSize={NonIdealStateIconSize.SMALL}
						/>
					)}
					{showOtrospagos &&
						props.otrospagos.map(otropago => (
							<EditableList2
								key={otropago.id}
								className={styles.element}
								label={(otropago.clave ? `${otropago.clave} ` : "") + otropago.concepto}
								labelClassName={styles.label}
								lines={props.for.length || 1}
								value={otropago.data}
								isNotValid={otropago.dataIsValid === false}
								onSaveData={data => props.onUpdateData(otropago.id, data)}
							/>
						))}
				</div>
			</div>
		</>
	);
};

export default Otrospagos;
