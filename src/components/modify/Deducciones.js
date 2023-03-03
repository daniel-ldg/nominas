import { EditableText, H5, Label, NonIdealState, NonIdealStateIconSize } from "@blueprintjs/core";
import EditableList2 from "../ui/editableList2/EditableList2";
import styles from "./Modify.module.css";

const Deducciones = props => {
	const showDeducciones = props.deducciones !== undefined && props.deducciones.length !== 0;

	return (
		<>
			<H5 style={{ marginTop: "20px" }}>Deducciones</H5>
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
					{!showDeducciones && (
						<NonIdealState
							icon='th-disconnect'
							title='No hay deducciones'
							layout='horizontal'
							iconSize={NonIdealStateIconSize.SMALL}
						/>
					)}
					{showDeducciones &&
						props.deducciones.map(deduccion => (
							<EditableList2
								key={deduccion.id}
								className={styles.element}
								label={(deduccion.clave ? `${deduccion.clave} ` : "") + deduccion.concepto}
								labelClassName={styles.label}
								lines={props.for.length || 1}
								value={deduccion.data}
								isNotValid={deduccion.dataIsValid === false}
								onSaveData={data => props.onUpdateData(deduccion.id, data)}
							/>
						))}
				</div>
			</div>
		</>
	);
};

export default Deducciones;
