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
import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import DraggableFlexContainer from "../../../../utils/draggable/DraggableFlexContainer";
import FlexContainer from "../../../../utils/FlexContainer";
import SelectDialog from "../../../../utils/SelectDialog";
import { ToasterSingleton } from "../../../../utils/ToasterSingleton";
import styles from "./ConfigDrawer.module.css";

const DEDUCCIONES_LIST = [
	{ tipo: "001", clave: "001", concepto: "SEGURIDAD SOCIAL" },
	{ tipo: "002", clave: "002", concepto: "ISR" },
	{ tipo: "003", clave: "003", concepto: "APORTACIONES A RETIRO, CESANTIA EN EDAD AVANZADA Y VEJEZ" },
	{ tipo: "004", clave: "004", concepto: "OTROS" },
	{ tipo: "005", clave: "005", concepto: "APORTACIONES A FONDO DE VIVIENDA" },
	{ tipo: "006", clave: "006", concepto: "DESCUENTO POR INCAPACIDAD" },
	{ tipo: "007", clave: "007", concepto: "PENSION ALIMENTICIA" },
	{ tipo: "008", clave: "008", concepto: "RENTA" },
	{ tipo: "009", clave: "009", concepto: "PRESTAMOS PROVENIENTES DEL FONDO NACIONAL DE LA VIVIENDA PARA LOS TRABAJADORES" },
	{ tipo: "010", clave: "010", concepto: "PAGO POR CREDITO DE VIVIENDA" },
	{ tipo: "011", clave: "011", concepto: "PAGO DE ABONOS INFONACOT" },
	{ tipo: "012", clave: "012", concepto: "ANTICIPO DE SALARIOS" },
	{ tipo: "013", clave: "013", concepto: "PAGOS HECHOS CON EXCESO AL TRABAJADOR" },
	{ tipo: "014", clave: "014", concepto: "ERRORES" },
	{ tipo: "015", clave: "015", concepto: "PERDIDAS" },
	{ tipo: "016", clave: "016", concepto: "AVERIAS" },
	{ tipo: "017", clave: "017", concepto: "ADQUISICION DE ARTICULOS PRODUCIDOS POR LA EMPRESA O ESTABLECIMIENTO" },
	{
		tipo: "018",
		clave: "018",
		concepto: "CUOTAS PARA LA CONSTITUCION Y FOMENTO DE SOCIEDADES COOPERATIVAS Y DE CAJAS DE AHORRO",
	},
	{ tipo: "019", clave: "019", concepto: "CUOTAS SINDICALES" },
	{ tipo: "020", clave: "020", concepto: "AUSENCIA (AUSENTISMO)" },
	{ tipo: "021", clave: "021", concepto: "CUOTAS OBRERO PATRONALES" },
	{ tipo: "022", clave: "022", concepto: "IMPUESTOS LOCALES" },
	{ tipo: "023", clave: "023", concepto: "APORTACIONES VOLUNTARIAS" },
	{ tipo: "024", clave: "024", concepto: "AJUSTE EN GRATIFICACIÓN ANUAL (AGUINALDO) EXENTO" },
	{ tipo: "025", clave: "025", concepto: "AJUSTE EN GRATIFICACIÓN ANUAL (AGUINALDO) GRAVADO" },
	{ tipo: "026", clave: "026", concepto: "AJUSTE EN PARTICIPACIÓN DE LOS TRABAJADORES EN LAS UTILIDADES PTU EXENTO" },
	{ tipo: "027", clave: "027", concepto: "AJUSTE EN PARTICIPACIÓN DE LOS TRABAJADORES EN LAS UTILIDADES PTU GRAVADO" },
	{ tipo: "028", clave: "028", concepto: "AJUSTE EN REEMBOLSO DE GASTOS MÉDICOS DENTALES Y HOSPITALARIOS EXENTO" },
	{ tipo: "029", clave: "029", concepto: "AJUSTE EN FONDO DE AHORRO EXENTO" },
	{ tipo: "030", clave: "030", concepto: "AJUSTE EN CAJA DE AHORRO EXENTO" },
	{ tipo: "031", clave: "031", concepto: "AJUSTE EN CONTRIBUCIONES A CARGO DEL TRABAJADOR PAGADAS POR EL PATRON EXENTO" },
	{ tipo: "032", clave: "032", concepto: "AJUSTE EN PREMIOS POR PUNTUALIDAD GRAVADO" },
	{ tipo: "033", clave: "033", concepto: "AJUSTE EN PRIMA DE SEGURO DE VIDA EXENTO" },
	{ tipo: "034", clave: "034", concepto: "AJUSTE EN SEGURO DE GASTOS MEDICOS MAYORES EXENTO" },
	{ tipo: "035", clave: "035", concepto: "AJUSTE EN CUOTAS SINDICALES PAGADAS POR EL PATRON EXENTO" },
	{ tipo: "036", clave: "036", concepto: "AJUSTE EN SUBSIDIOS POR INCAPACIDAD EXENTO" },
	{ tipo: "037", clave: "037", concepto: "AJUSTE EN BECAS PARA TRABAJADORES Y/O HIJOS EXENTO" },
	{ tipo: "038", clave: "038", concepto: "AJUSTE EN HORAS EXTRA EXENTO" },
	{ tipo: "039", clave: "039", concepto: "AJUSTE EN HORAS EXTRA GRAVADO" },
	{ tipo: "040", clave: "040", concepto: "AJUSTE EN PRIMA DOMINICAL EXENTO" },
	{ tipo: "041", clave: "041", concepto: "AJUSTE EN PRIMA DOMINICAL GRAVADO" },
	{ tipo: "042", clave: "042", concepto: "AJUSTE EN PRIMA VACACIONAL EXENTO" },
	{ tipo: "043", clave: "043", concepto: "AJUSTE EN PRIMA VACACIONAL GRAVADO" },
	{ tipo: "044", clave: "044", concepto: "AJUSTE EN PRIMA POR ANTIGUEDAD EXENTO" },
	{ tipo: "045", clave: "045", concepto: "AJUSTE EN PRIMA POR ANTIGUEDAD GRAVADO" },
	{ tipo: "046", clave: "046", concepto: "AJUSTE EN PAGOS POR SEPARACION EXENTO" },
	{ tipo: "047", clave: "047", concepto: "AJUSTE EN PAGOS POR SEPARACION GRAVADO" },
	{ tipo: "048", clave: "048", concepto: "AJUSTE EN SEGURO DE RETIRO EXENTO" },
	{ tipo: "049", clave: "049", concepto: "AJUSTE EN INDEMNIZACIONES EXENTO" },
	{ tipo: "050", clave: "050", concepto: "AJUSTE EN INDEMNIZACIONES GRAVADO" },
	{ tipo: "051", clave: "051", concepto: "AJUSTE EN REEMBOLSO POR FUNERAL EXENTO" },
	{ tipo: "052", clave: "052", concepto: "AJUSTE EN CUOTAS DE SEGURIDAD SOCIAL PAGADAS POR EL PATRON EXENTO" },
	{ tipo: "053", clave: "053", concepto: "AJUSTE EN COMISIONES GRAVADO" },
	{ tipo: "054", clave: "054", concepto: "AJUSTE EN VALES DE DESPENSA EXENTO" },
	{ tipo: "055", clave: "055", concepto: "AJUSTE EN VALES DE RESTAURANTE EXENTO" },
	{ tipo: "056", clave: "056", concepto: "AJUSTE EN VALES DE GASOLINA EXENTO" },
	{ tipo: "057", clave: "057", concepto: "AJUSTE EN VALES DE ROPA EXENTO" },
	{ tipo: "058", clave: "058", concepto: "AJUSTE EN AYUDA PARA RENTA EXENTO" },
	{ tipo: "059", clave: "059", concepto: "AJUSTE EN AYUDA PARA ARTICULOS ESCOLARES EXENTO" },
	{ tipo: "060", clave: "060", concepto: "AJUSTE EN AYUDA PARA ANTEOJOS EXENTO" },
	{ tipo: "061", clave: "061", concepto: "AJUSTE EN AYUDA PARA TRANSPORTE EXENTO" },
	{ tipo: "062", clave: "062", concepto: "AJUSTE EN AYUDA PARA GASTOS DE FUNERAL EXENTO" },
	{ tipo: "063", clave: "063", concepto: "AJUSTE EN OTROS INGRESOS POR SALARIOS EXENTO" },
	{ tipo: "064", clave: "064", concepto: "AJUSTE EN OTROS INGRESOS POR SALARIOS GRAVADO" },
	{ tipo: "065", clave: "065", concepto: "AJUSTE EN JUBILACIONES O PENSIONES EN UNA SOLA EXHIBICION EXENTO" },
	{ tipo: "066", clave: "066", concepto: "AJUSTE EN JUBILACIONES O PENSIONES EN UNA SOLA EXHIBICION GRAVADO" },
	{ tipo: "067", clave: "067", concepto: "AJUSTE EN PAGOS POR SEPARACION ACUMULABLE" },
	{ tipo: "068", clave: "068", concepto: "AJUSTE EN PAGOS POR SEPARACION NO ACUMULABLE" },
	{ tipo: "069", clave: "069", concepto: "AJUSTE EN JUBILACIONES, PENSIONES O HABERES DE RETIRO EN PARCIALIDADES EXENTO" },
	{ tipo: "070", clave: "070", concepto: "AJUSTE EN JUBILACIONES, PENSIONES O HABERES DE RETIRO EN PARCIALIDADES GRAVADO" },
	{ tipo: "071", clave: "071", concepto: "AJUSTE EN SUBSIDIO PARA EL EMPLEO (EFECTIVAMENTE ENTREGADO AL TRABAJADOR)" },
	{ tipo: "072", clave: "072", concepto: "AJUSTE EN INGRESOS EN ACCIONES O TITULOS VALOR QUE REPRESENTAN BIENES EXENTO" },
	{ tipo: "073", clave: "073", concepto: "AJUSTE EN INGRESOS EN ACCIONES O TITULOS VALOR QUE REPRESENTAN BIENES GRAVADO" },
	{ tipo: "074", clave: "074", concepto: "AJUSTE EN ALIMENTACION EXENTO" },
	{ tipo: "075", clave: "075", concepto: "AJUSTE EN ALIMENTACION GRAVADO" },
	{ tipo: "076", clave: "076", concepto: "AJUSTE EN HABITACION EXENTO" },
	{ tipo: "077", clave: "077", concepto: "AJUSTE EN HABITACION GRAVADO" },
	{ tipo: "078", clave: "078", concepto: "AJUSTE EN PREMIOS POR ASISTENCIA" },
	{ tipo: "079", clave: "079", concepto: "AJUSTE EN PAGOS DISTINTOS A LOS LISTADOS" },
	{ tipo: "080", clave: "080", concepto: "AJUSTE EN VIATICOS GRAVADOS" },
	{ tipo: "081", clave: "081", concepto: "AJUSTE EN VIATICOS (ENTREGADOS AL TRABAJADOR)" },
	{ tipo: "082", clave: "082", concepto: "AJUSTE EN FONDO DE AHORRO GRAVADO" },
	{ tipo: "083", clave: "083", concepto: "AJUSTE EN CAJA DE AHORRO GRAVADO" },
	{ tipo: "084", clave: "084", concepto: "AJUSTE EN PRIMA DE SEGURO DE VIDA GRAVADO" },
	{ tipo: "085", clave: "085", concepto: "AJUSTE EN SEGURO DE GASTOS MEDICOS MAYORES GRAVADO" },
	{ tipo: "086", clave: "086", concepto: "AJUSTE EN SUBSIDIOS POR INCAPACIDAD GRAVADO" },
	{ tipo: "087", clave: "087", concepto: "AJUSTE EN BECAS PARA TRABAJADORES Y/O HIJOS GRAVADO" },
	{ tipo: "088", clave: "088", concepto: "AJUSTE EN SEGURO DE RETIRO GRAVADO" },
	{ tipo: "089", clave: "089", concepto: "AJUSTE EN VALES DE DESPENSA GRAVADO" },
	{ tipo: "090", clave: "090", concepto: "AJUSTE EN VALES DE RESTAURANTE GRAVADO" },
	{ tipo: "091", clave: "091", concepto: "AJUSTE EN VALES DE GASOLINA GRAVADO" },
	{ tipo: "092", clave: "092", concepto: "AJUSTE EN VALES DE ROPA GRAVADO" },
	{ tipo: "093", clave: "093", concepto: "AJUSTE EN AYUDA PARA RENTA GRAVADO" },
	{ tipo: "094", clave: "094", concepto: "AJUSTE EN AYUDA PARA ARTICULOS ESCOLARES GRAVADO" },
	{ tipo: "095", clave: "095", concepto: "AJUSTE EN AYUDA PARA ANTEOJOS GRAVADO" },
	{ tipo: "096", clave: "096", concepto: "AJUSTE EN AYUDA PARA TRANSPORTE GRAVADO" },
	{ tipo: "097", clave: "097", concepto: "AJUSTE EN AYUDA PARA GASTOS DE FUNERAL GRAVADO" },
	{ tipo: "098", clave: "098", concepto: "AJUSTE A INGRESOS ASIMILADOS A SALARIOS GRAVADOS" },
	{ tipo: "099", clave: "099", concepto: "AJUSTE A INGRESOS POR SUELDOS Y SALARIOS GRAVADOS" },
	{ tipo: "100", clave: "100", concepto: "AJUSTE EN VIATICOS EXENTOS" },
	{ tipo: "101", clave: "101", concepto: "ISR RETENIDO DE EJERCICIO ANTERIOR" },
	{
		tipo: "102",
		clave: "102",
		concepto:
			"AJUSTE A PAGOS POR GRATIFICACIONES U OTROS A EXTRABAJADORES DERIVADOS DE JUBILACION EN PARCIALIDADES GRAVADOS",
	},
	{
		tipo: "103",
		clave: "103",
		concepto:
			"AJUSTE A PAGOS A EXTRABAJADORES DE JUBILACION EN PARCIALIDADES DERIVADOS DE UNA RESOLUCION JUDICIAL GRAVADOS",
	},
	{
		tipo: "104",
		clave: "104",
		concepto: "AJUSTE A PAGOS A EXTRABAJADORES DE JUBILACION EN PARCIALIDADES DERIVADOS DE UNA RESOLUCION JUDICIAL EXENTOS",
	},
	{
		tipo: "105",
		clave: "105",
		concepto:
			"AJUSTE A PAGOS A EXTRABAJADORES DE JUBILACION EN UNA SOLA EXHIBICION DERIVADOS DE UNA RESOLUCION JUDICIAL GRAVADOS",
	},
	{
		tipo: "106",
		clave: "106",
		concepto:
			"AJUSTE A PAGOS A EXTRABAJADORES DE JUBILACION EN UNA SOLA EXHIBICION DERIVADOS DE UNA RESOLUCION JUDICIAL EXENTOS",
	},
];

const DeduccionesConfig = ({ deducciones, onUpdate }) => {
	const [isAdding, setIsAdding] = useState(false);

	const updateTipo = (tipo, id) => {
		let updated = [...deducciones];
		updated.find(deduccion => deduccion.id === id).tipo = tipo;
		onUpdate(updated);
	};

	const updateClave = (clave, id) => {
		let updated = [...deducciones];
		updated.find(deduccion => deduccion.id === id).clave = clave;
		onUpdate(updated);
	};

	const updateConcepto = (concepto, id) => {
		let updated = [...deducciones];
		updated.find(deduccion => deduccion.id === id).concepto = concepto;
		onUpdate(updated);
	};

	const deleteDeduccion = deleted => {
		let updated = [...deducciones];
		updated = updated.filter(deduccion => deduccion.id !== deleted.id);
		onUpdate(updated);
		ToasterSingleton.showUndo(deleted, { message: `Deducción eliminada: ${deleted.concepto}` }, undoDeleteDeduccion);
	};
	const undoDeleteDeduccion = undo => {
		onUpdate(prevDeducciones => {
			let updated = [...prevDeducciones];
			updated.splice(undo.id, 0, undo); // modifies updated array
			return updated;
		});
	};

	const addDeduccion = newDeduccion => {
		let updated = [...deducciones, { ...newDeduccion, id: deducciones.length }];
		onUpdate(updated);
		hideAddDialog();
	};

	const handleDragAndDrop = ({ source, destination }) => {
		let updated = [...deducciones];
		updated.splice(source, 1);
		updated.splice(destination, 0, deducciones[source]);
		onUpdate(updated);
	};

	const showAddDialog = () => setIsAdding(true);

	const hideAddDialog = () => setIsAdding(false);

	return (
		<Card>
			<SelectDialog
				isOpen={isAdding}
				onCancel={hideAddDialog}
				onSelect={addDeduccion}
				title='Agregar deducción'
				items={DEDUCCIONES_LIST.map(deduccion => ({
					text: deduccion.concepto,
					subtext: deduccion.tipo,
					disabled: deducciones.map(added => added.tipo).includes(deduccion.tipo),
					value: deduccion,
				}))}
			/>
			<FlexContainer className={styles.sectionHeaderContainer} horizontal={true}>
				<H5 className={styles.sectionHeader}>Deducciones</H5>
				<Button className={styles.btnAdd} icon='add' small={true} minimal={true} onClick={showAddDialog}>
					Agregar deducción
				</Button>
			</FlexContainer>
			{deducciones.length > 0 && (
				<FlexContainer horizontal={true} className={Classes.TEXT_MUTED}>
					<Icon className={styles.dragHandleHeader} icon={"arrows-vertical"} size={10} />
					<div className={styles.tipo}>Tipo</div>
					<div className={styles.clave}>Clave</div>
					<div className={styles.concepto}>Concepto</div>
					<div className={styles.eliminar}>Eliminar</div>
				</FlexContainer>
			)}
			<DraggableFlexContainer onChange={handleDragAndDrop}>
				{deducciones.length === 0 && (
					<NonIdealState
						layout='horizontal'
						icon='th-disconnect'
						title='No hay deducciones'
						iconSize={NonIdealStateIconSize.EXTRA_SMALL}
					/>
				)}
				{deducciones.map((deduccion, i) => (
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
										value={deduccion.tipo}
										onChange={event => updateTipo(event.target.value, deduccion.id)}
									/>
									<InputGroup
										className={styles.clave}
										value={deduccion.clave}
										onChange={event => updateClave(event.target.value, deduccion.id)}
									/>
									<InputGroup
										fill={true}
										value={deduccion.concepto}
										onChange={event => updateConcepto(event.target.value, deduccion.id)}
									/>
									<Button
										className={styles.eliminar}
										icon='remove'
										onClick={() => deleteDeduccion(deduccion)}
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

export default DeduccionesConfig;
