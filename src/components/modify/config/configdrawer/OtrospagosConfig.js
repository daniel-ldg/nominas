import {
	Button,
	Card,
	Classes,
	ControlGroup,
	H5,
	Icon,
	IconSize,
	InputGroup,
	NonIdealState,
	NonIdealStateIconSize,
} from "@blueprintjs/core";
import { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import DraggableFlexContainer from "../../../../utils/draggable/DraggableFlexContainer";
import FlexContainer from "../../../../utils/FlexContainer";
import SelectDialog from "../../../../utils/SelectDialog";
import { ToasterSingleton } from "../../../../utils/ToasterSingleton";
import styles from "./ConfigDrawer.module.css";

const PERSEPCION_SUELDO = "001";
const PERCEPCION_AGUINALDO = "002";
const PERCEPCION_PTU = "003";
const PERCEPCIONES_TIPO_SUBSIDIO_EMPLEO_NEEDED = [PERSEPCION_SUELDO, PERCEPCION_AGUINALDO, PERCEPCION_PTU];
const SUBSIDIO_EMPLEO_TIPO = "002";
const SUBSIDIO_EMPLEO = {
	tipo: SUBSIDIO_EMPLEO_TIPO,
	clave: "002",
	concepto: "SUBSIDIO PARA EL EMPLEO",
	isSubsidioEmpleo: true,
	subAdd: { tipo: "", clave: "", concepto: "SUBSIDIO CAUSADO", isSubsidioCausado: true },
};
const OTROSPAGOS_LIST = [
	{ tipo: "001", clave: "001", concepto: "REINTEGRO DE ISR PAGADO EN EXCESO" },
	SUBSIDIO_EMPLEO,
	{ tipo: "003", clave: "003", concepto: "VIATICOS" },
	{ tipo: "004", clave: "004", concepto: "APLICACIÓN DE SALDO A FAVOR POR COMPENSACIÓN ANUAL" },
	{ tipo: "005", clave: "005", concepto: "REINTEGRO DE ISR RETENIDO EN EXCESO DE EJERCICIO ANTERIOR" },
	{ tipo: "999", clave: "999", concepto: "OTRO NO LISTADO", isUnlimited: true },
];

const OtrospagosConfig = ({ otrospagos, percepciones, onUpdate }) => {
	const [isAdding, setIsAdding] = useState(false);

	useEffect(() => {
		if (percepciones.some(percepcion => PERCEPCIONES_TIPO_SUBSIDIO_EMPLEO_NEEDED.includes(percepcion.tipo))) {
			if (!otrospagos.some(otropago => otropago.tipo === SUBSIDIO_EMPLEO_TIPO)) {
				addOtropago(SUBSIDIO_EMPLEO);
			}
		}
	}, [percepciones]);

	const updateTipo = (tipo, id) => {
		let updated = [...otrospagos];
		updated.find(otropago => otropago.id === id).tipo = tipo;
		onUpdate(updated);
	};

	const updateClave = (clave, id) => {
		let updated = [...otrospagos];
		updated.find(otropago => otropago.id === id).clave = clave;
		onUpdate(updated);
	};

	const updateConcepto = (concepto, id) => {
		let updated = [...otrospagos];
		updated.find(otropago => otropago.id === id).concepto = concepto;
		onUpdate(updated);
	};

	const deleteOtropago = deleted => {
		let updated = [...otrospagos];
		if (deleted.isSubsidioEmpleo || deleted.isSubsidioCausado) {
			let subsidio = updated.filter(otropago => otropago.isSubsidioEmpleo || otropago.isSubsidioCausado);
			updated = updated.filter(otropago => !otropago.isSubsidioEmpleo && !otropago.isSubsidioCausado);
			ToasterSingleton.showUndo(subsidio, { message: "Subsidio para el empleo eliminado" }, undoArr =>
				undoArr.forEach(undo => undoDeleteOtropago(undo))
			);
		} else {
			updated = updated.filter(otrospago => otrospago.id !== deleted.id);
			ToasterSingleton.showUndo(deleted, { message: `Otro pago eliminado: ${deleted.concepto}` }, undoDeleteOtropago);
		}
		onUpdate(updated);
	};

	const undoDeleteOtropago = undo => {
		onUpdate(prevOtrospagos => {
			let updated = [...prevOtrospagos];
			updated.splice(undo.id, 0, undo); // modifies updated array
			return updated;
		});
	};

	const addOtropago = newOtropago => {
		let newPagos = [];
		if (newOtropago.subAdd) {
			newPagos.push({ ...newOtropago.subAdd, id: otrospagos.length + 1 });
		}
		let newPago = { ...newOtropago, id: otrospagos.length };
		delete newPago.subAdd;
		newPagos.push(newPago);
		newPagos.reverse();
		let updated = [...otrospagos, ...newPagos];
		onUpdate(updated);
		hideAddDialog();
	};

	const handleDragAndDrop = ({ source, destination }) => {
		let updated = [...otrospagos];
		updated.splice(source, 1);
		updated.splice(destination, 0, otrospagos[source]);
		onUpdate(updated);
	};

	const isDeleteDisabled = otrospago => {
		return (
			(otrospago.isSubsidioEmpleo || otrospago.isSubsidioCausado) &&
			percepciones.some(percepcion => PERCEPCIONES_TIPO_SUBSIDIO_EMPLEO_NEEDED.includes(percepcion.tipo))
		);
	};

	const showAddDialog = () => setIsAdding(true);

	const hideAddDialog = () => setIsAdding(false);

	return (
		<Card className={styles.configCard}>
			<SelectDialog
				isOpen={isAdding}
				onCancel={hideAddDialog}
				onSelect={addOtropago}
				title='Agregar otro pago'
				items={OTROSPAGOS_LIST.map(otropago => ({
					text: otropago.concepto,
					subtext: otropago.tipo,
					disabled: !otropago.isUnlimited && otrospagos.map(added => added.tipo).includes(otropago.tipo),
					value: otropago,
				}))}
			/>
			<FlexContainer className={styles.sectionHeaderContainer} horizontal={true}>
				<H5 className={styles.sectionHeader}>Otros pagos</H5>
				<Button className={styles.btnAdd} icon='add' small={true} minimal={true} onClick={showAddDialog}>
					Agregar otro pago
				</Button>
			</FlexContainer>
			{otrospagos.length > 0 && (
				<FlexContainer horizontal={true} className={Classes.TEXT_MUTED}>
					<Icon className={styles.dragHandleHeader} icon={"arrows-vertical"} size={10} />
					<div className={styles.tipo}>Tipo</div>
					<div className={styles.clave}>Clave</div>
					<div className={styles.concepto}>Concepto</div>
					<div className={styles.eliminar}>Eliminar</div>
				</FlexContainer>
			)}
			<DraggableFlexContainer onChange={handleDragAndDrop}>
				{otrospagos.length === 0 && (
					<NonIdealState
						layout='horizontal'
						icon='th-disconnect'
						title='No hay otros pagos'
						iconSize={NonIdealStateIconSize.EXTRA_SMALL}
					/>
				)}
				{otrospagos.map((otropago, i) => (
					<Draggable draggableId={"" + i} index={i} key={i}>
						{provided => (
							<div ref={provided.innerRef} {...provided.draggableProps}>
								<ControlGroup className={styles.itemControlGroup}>
									<Icon
										className={styles.dragHandle}
										size={IconSize.LARGE}
										style={{ marginTop: "5px" }}
										icon={"drag-handle-vertical"}
										{...provided.dragHandleProps}
									/>
									<InputGroup
										className={styles.tipo}
										value={otropago.tipo}
										readOnly={otropago.isSubsidioEmpleo || otropago.isSubsidioCausado}
										onChange={event => updateTipo(event.target.value, otropago.id)}
									/>
									<InputGroup
										className={styles.clave}
										value={otropago.clave}
										readOnly={otropago.isSubsidioEmpleo || otropago.isSubsidioCausado}
										onChange={event => updateClave(event.target.value, otropago.id)}
									/>
									<InputGroup
										fill={true}
										value={otropago.concepto}
										onChange={event => updateConcepto(event.target.value, otropago.id)}
									/>
									<Button
										className={styles.eliminar}
										icon='remove'
										disabled={isDeleteDisabled(otropago)}
										onClick={() => deleteOtropago(otropago)}
									/>
								</ControlGroup>
							</div>
						)}
					</Draggable>
				))}
			</DraggableFlexContainer>
		</Card>
	);
};

export default OtrospagosConfig;
