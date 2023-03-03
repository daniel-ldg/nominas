import { EditableText, H5, Label, NonIdealState, NonIdealStateIconSize } from "@blueprintjs/core";
import React from "react";
import EditableList2 from "../ui/editableList2/EditableList2";
import styles from "./Modify.module.css";

const Percepciones = props => {
	const showPercepciones = props.percepciones !== undefined && props.percepciones.length !== 0;

	return (
		<>
			<H5 style={{ marginTop: "20px" }}>Percepciones</H5>
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
					{!showPercepciones && (
						<NonIdealState
							icon='th-disconnect'
							title='No hay percepciones'
							layout='horizontal'
							iconSize={NonIdealStateIconSize.SMALL}
						/>
					)}
					{showPercepciones &&
						props.percepciones.map(percepcion => (
							<React.Fragment key={percepcion.id}>
								<EditableList2
									className={styles.element}
									label={`(G)${percepcion.clave} ${percepcion.concepto}`}
									labelClassName={styles.label}
									lines={props.for.length || 1}
									value={percepcion.dataGravado}
									isNotValid={percepcion.dataGravadoIsValid === false}
									onSaveData={data => props.onUpdateDataGravado(percepcion.id, data)}
								/>
								{percepcion.exento && (
									<EditableList2
										className={styles.element}
										label={`(E)${percepcion.clave} ${percepcion.concepto}`}
										labelClassName={styles.label}
										lines={props.for.length || 1}
										value={percepcion.dataExento}
										isNotValid={percepcion.dataExentoIsValid === false}
										onSaveData={data => props.onUpdateDataExento(percepcion.id, data)}
									/>
								)}
							</React.Fragment>
						))}
				</div>
			</div>
		</>
	);
};

export default Percepciones;
