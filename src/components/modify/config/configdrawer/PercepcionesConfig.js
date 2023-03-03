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
import FlexContainer from "../../../../utils/FlexContainer";
import styles from "./ConfigDrawer.module.css";
import CheckboxButton from "../../../../utils/CheckboxButton";
import { useState } from "react";
import SelectDialog from "../../../../utils/SelectDialog";
import DraggableFlexContainer from "../../../../utils/draggable/DraggableFlexContainer";
import { Draggable } from "react-beautiful-dnd";
import { ToasterSingleton } from "../../../../utils/ToasterSingleton";

const PERCEPCIONES_LIST = [
	{ tipo: "001", clave: "001", concepto: "SUELDOS, SALARIOS  RAYAS Y JORNALES" },
	{ tipo: "002", clave: "002", concepto: "GRATIFICACION ANUAL (AGUINALDO)" },
	{ tipo: "003", clave: "003", concepto: "PARTICIPACION DE LOS TRABAJADORES EN LAS UTILIDADES PTU" },
	{ tipo: "004", clave: "004", concepto: "REEMBOLSO DE GASTOS MEDICOS DENTALES Y HOSPITALARIOS" },
	{ tipo: "005", clave: "005", concepto: "FONDO DE AHORRO" },
	{ tipo: "006", clave: "006", concepto: "CAJA DE AHORRO" },
	{ tipo: "009", clave: "009", concepto: "CONTRIBUCIONES A CARGO DEL TRABAJADOR PAGADAS POR EL PATRON" },
	{ tipo: "010", clave: "010", concepto: "PREMIOS POR PUNTUALIDAD" },
	{ tipo: "011", clave: "011", concepto: "PRIMA DE SEGURO DE VIDA" },
	{ tipo: "012", clave: "012", concepto: "SEGURO DE GASTOS MEDICOS MAYORES" },
	{ tipo: "013", clave: "013", concepto: "CUOTAS SINDICALES PAGADAS POR EL PATRON" },
	{ tipo: "014", clave: "014", concepto: "SUBSIDIOS POR INCAPACIDAD" },
	{ tipo: "015", clave: "015", concepto: "BECAS PARA TRABAJADORES Y/O HIJOS" },
	{ tipo: "019", clave: "019", concepto: "HORAS EXTRA" },
	{ tipo: "020", clave: "020", concepto: "PRIMA DOMINICAL" },
	{ tipo: "021", clave: "021", concepto: "PRIMA VACACIONAL" },
	{ tipo: "022", clave: "022", concepto: "PRIMA POR ANTIGÜEDAD" },
	{ tipo: "023", clave: "023", concepto: "PAGOS POR SEPARACIÓN" },
	{ tipo: "024", clave: "024", concepto: "SEGURO DE RETIRO" },
	{ tipo: "025", clave: "025", concepto: "INDEMNIZACIONES" },
	{ tipo: "026", clave: "026", concepto: "REEMBOLSO POR FUNERAL" },
	{ tipo: "027", clave: "027", concepto: "CUOTAS DE SEGURIDAD SOCIAL PAGADAS POR EL PATRON" },
	{ tipo: "028", clave: "028", concepto: "COMISIONES" },
	{ tipo: "029", clave: "029", concepto: "VALES DE DESPENSA" },
	{ tipo: "030", clave: "030", concepto: "VALES DE RESTAURANTE" },
	{ tipo: "031", clave: "031", concepto: "VALES DE GASOLINA" },
	{ tipo: "032", clave: "032", concepto: "VALES DE ROPA" },
	{ tipo: "033", clave: "033", concepto: "AYUDA PARA RENTA" },
	{ tipo: "034", clave: "034", concepto: "AYUDA PARA ARTÍCULOS ESCOLARES" },
	{ tipo: "035", clave: "035", concepto: "AYUDA PARA ANTEOJOS" },
	{ tipo: "036", clave: "036", concepto: "AYUDA PARA TRANSPORTE" },
	{ tipo: "037", clave: "037", concepto: "AYUDA PARA GASTOS DE FUNERAL" },
	{ tipo: "038", clave: "038", concepto: "OTROS INGRESOS POR SALARIOS" },
	{ tipo: "039", clave: "039", concepto: "JUBILACIONES, PENSIONES O HABERES DE RETIRO" },
	{ tipo: "044", clave: "044", concepto: "JUBILACIONES, PENSIONES O HABERES DE RETIRO EN PARCIALIDADES" },
	{ tipo: "045", clave: "045", concepto: "INGRESOS EN ACCIONES O TITULOS VALOR QUE REPRESENTAN BIENES" },
	{ tipo: "046", clave: "046", concepto: "INGRESOS ASIMILADOS A SALARIOS" },
	{ tipo: "047", clave: "047", concepto: "ALIMENTACION" },
	{ tipo: "048", clave: "048", concepto: "HABITACION" },
	{ tipo: "049", clave: "049", concepto: "PREMIOS POR ASISTENCIA" },
	{ tipo: "050", clave: "050", concepto: "VIATICOS" },
	{ tipo: "051", clave: "051", concepto: "PAGOS DERIVADOS DE JUBILACIÓN EN PARCIALIDADES" },
	{
		tipo: "052",
		clave: "052",
		concepto: "PAGO JUBILACION DE EXTRABAJADORES EN PARCIALIDADES DERIVADO DE LA EJECUCION DE RESOLUCION JUDICIAL",
	},
	{
		tipo: "053",
		clave: "053",
		concepto: "PAGO JUBILACION DE EXTRABAJADORES EN UNA SOLA EXHIBICION DERIVADO DE LA EJECUCION DE RESOLUCION JUDICIAL",
	},
];

const PercepcionesConfig = ({ percepciones, onUpdate }) => {
	const [isAdding, setIsAdding] = useState(false);

	const updateTipo = (tipo, id) => {
		let updated = [...percepciones];
		updated.find(percepcion => percepcion.id === id).tipo = tipo;
		onUpdate(updated);
	};

	const updateClave = (clave, id) => {
		let updated = [...percepciones];
		updated.find(percepcion => percepcion.id === id).clave = clave;
		onUpdate(updated);
	};

	const updateConcepto = (concepto, id) => {
		let updated = [...percepciones];
		updated.find(percepcion => percepcion.id === id).concepto = concepto;
		onUpdate(updated);
	};

	const updateExento = (exento, id) => {
		let updated = [...percepciones];
		updated.find(percepcion => percepcion.id === id).exento = exento;
		onUpdate(updated);
	};

	const deletePercepcion = deleted => {
		let updated = [...percepciones];
		updated = updated.filter(percepcion => percepcion.id !== deleted.id);
		onUpdate(updated);
		ToasterSingleton.showUndo(deleted, { message: `Percepción eliminada: ${deleted.concepto}` }, undoDeletePercepcion);
	};

	const undoDeletePercepcion = undo => {
		onUpdate(prevPercepciones => {
			let updated = [...prevPercepciones];
			updated.splice(undo.id, 0, undo); // modifies updated array
			return updated;
		});
	};

	const addPercepcion = newPercepcion => {
		let updated = [...percepciones, { ...newPercepcion, id: percepciones.length }];
		onUpdate(updated);
		hideAddDialog();
	};

	const handleDragAndDrop = ({ source, destination }) => {
		let updated = [...percepciones];
		updated.splice(source, 1);
		updated.splice(destination, 0, percepciones[source]);
		onUpdate(updated);
	};

	const showAddDialog = () => setIsAdding(true);

	const hideAddDialog = () => setIsAdding(false);

	return (
		<Card className={styles.configCard}>
			<SelectDialog
				isOpen={isAdding}
				onCancel={hideAddDialog}
				onSelect={addPercepcion}
				title='Agregar percepción'
				items={PERCEPCIONES_LIST.map(percepcion => ({
					text: percepcion.concepto,
					subtext: percepcion.tipo,
					disabled: percepciones.map(added => added.tipo).includes(percepcion.tipo),
					value: percepcion,
				}))}
			/>
			<FlexContainer className={styles.sectionHeaderContainer} horizontal={true}>
				<H5 className={styles.sectionHeader}>Percepciones</H5>
				<Button className={styles.btnAdd} icon='add' small={true} minimal={true} onClick={showAddDialog}>
					Agregar percepción
				</Button>
			</FlexContainer>
			{percepciones.length > 0 && (
				<FlexContainer horizontal={true} className={Classes.TEXT_MUTED}>
					<Icon className={styles.dragHandleHeader} icon='arrows-vertical' size={10} />
					<div className={styles.tipo}>Tipo</div>
					<div className={styles.clave}>Clave</div>
					<div className={styles.concepto}>Concepto</div>
					<div className={styles.exento}>Exento</div>
					<div className={styles.eliminar}>Eliminar</div>
				</FlexContainer>
			)}
			<DraggableFlexContainer onChange={handleDragAndDrop}>
				{percepciones.length === 0 && (
					<NonIdealState
						layout='horizontal'
						icon='th-disconnect'
						title='No hay percepciones'
						iconSize={NonIdealStateIconSize.EXTRA_SMALL}
					/>
				)}
				{percepciones.map((percepcion, i) => (
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
										value={percepcion.tipo}
										onChange={event => updateTipo(event.target.value, percepcion.id)}
									/>
									<InputGroup
										className={styles.clave}
										value={percepcion.clave}
										onChange={event => updateClave(event.target.value, percepcion.id)}
									/>
									<InputGroup
										fill={true}
										value={percepcion.concepto}
										onChange={event => updateConcepto(event.target.value, percepcion.id)}
									/>
									<CheckboxButton
										className={styles.exento}
										checked={percepcion.exento}
										onChange={exento => updateExento(exento, percepcion.id)}
									/>
									<Button
										className={styles.eliminar}
										icon='remove'
										onClick={() => deletePercepcion(percepcion)}
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

export default PercepcionesConfig;
