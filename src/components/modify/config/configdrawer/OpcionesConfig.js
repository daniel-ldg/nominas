import { Card, H5, Label } from "@blueprintjs/core";
import CustomSelect2 from "../../../../utils/CustomSelect2";
import FlexContainer from "../../../../utils/FlexContainer";
import styles from "./ConfigDrawer.module.css";

const TIPO_LIST = [
	{ valor: "O", descipcion: "Nómina ordinaria" },
	{ valor: "E", descipcion: "Nómina extraordinaria" },
];

const PERIODICIDAD_PAGO_LIST = [
	{ valor: "01", descipcion: "Diario" },
	{ valor: "02", descipcion: "Semanal" },
	{ valor: "03", descipcion: "Catorcenal" },
	{ valor: "04", descipcion: "Quincenal" },
	{ valor: "05", descipcion: "Mensual" },
	{ valor: "06", descipcion: "Bimestral" },
	{ valor: "07", descipcion: "Unidad obra" },
	{ valor: "08", descipcion: "Comisión" },
	{ valor: "09", descipcion: "Precio alzado" },
	{ valor: "10", descipcion: "Decenal" },
	{ valor: "99", descipcion: "Otra Periodicidad" },
];

const OpcionesConfig = ({ opciones, onChange }) => {
	const updateTipo = tipo => {
		onChange({ ...opciones, tipo: tipo.value });
	};
	const updatePeriodicidad = periodicidad => {
		onChange({ ...opciones, periodicidad: periodicidad.value });
	};

	const tipoListDecorated = TIPO_LIST.map(tipo => ({ text: tipo.descipcion, subtext: tipo.valor, value: tipo.valor }));
	const periodicidadListDecorated = PERIODICIDAD_PAGO_LIST.map(periodicidad => ({
		text: periodicidad.descipcion,
		subtext: periodicidad.valor,
		value: periodicidad.valor,
	}));

	return (
		<Card className={styles.configCard}>
			<H5>Opciones</H5>
			<FlexContainer horizontal={true}>
				<Label className={styles.configLabel}>
					Tipo de nómina
					<CustomSelect2
						onSelect={updateTipo}
						selected={tipoListDecorated.find(tipo => tipo.value === opciones.tipo)}
						selectProps={{ filterable: false, itemsEqual: "value" }}
						items={tipoListDecorated}
					/>
				</Label>
				<Label className={styles.configLabel}>
					Periodicidad de pago
					<CustomSelect2
						onSelect={updatePeriodicidad}
						selected={periodicidadListDecorated.find(periodicidad => periodicidad.value === opciones.periodicidad)}
						selectProps={{ filterable: false, itemsEqual: "value" }}
						items={periodicidadListDecorated}
					/>
				</Label>
			</FlexContainer>
		</Card>
	);
};

export default OpcionesConfig;
