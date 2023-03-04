import { AnchorButton, Button, ButtonGroup } from "@blueprintjs/core";
import { useContext, useEffect, useState } from "react";
import { LocalStorageContext } from "../../../store/LocalStorageContext";
import ConfigDrawer from "./configdrawer/ConfigDrawer";

const SUBSIDIO_EMPLEO = [
	{ tipo: "002", clave: "002", concepto: "SUBSIDIO PARA EL EMPLEO", isSubsidioEmpleo: true },
	{ tipo: "", clave: "", concepto: "SUBSIDIO CAUSADO", isSubsidioCausado: true },
];

const CONFIG_ID = {
	NORMAL: 0,
	EXTRAORDINARIA: 1,
	PERSONALIZADA: 2,
};

let CONFIGS = {
	NORMAL: {
		id: CONFIG_ID.NORMAL,
		percepciones: [
			{ tipo: "001", clave: "001", concepto: "SUELDO", exento: false },
			{ tipo: "046", clave: "046", concepto: "HONORARIOS", exento: false },
			{ tipo: "038", clave: "038", concepto: "COMPENSACION", exento: false },
			{ tipo: "049", clave: "049", concepto: "PREMIO ASISTENCIA", exento: false },
			{ tipo: "010", clave: "010", concepto: "PREMIO PUNTUALIDAD", exento: false },
			{ tipo: "028", clave: "028", concepto: "COMISIONES", exento: false },
		],
		otrospagos: [
			{ tipo: "999", clave: "999", concepto: "APOYO GASTOS PANDEMIA LUZ, INTERNET" },
			{ tipo: "999", clave: "999", concepto: "PRESTAMO" },
			...SUBSIDIO_EMPLEO,
		],
		deducciones: [
			{ tipo: "001", clave: "001", concepto: "CUOTAS IMSS" },
			{ tipo: "002", clave: "002", concepto: "ISR" },
			{ tipo: "010", clave: "010", concepto: "DESCUENTO INFONAVIT" },
			{ tipo: "011", clave: "011", concepto: "PAGO DE ABONOS INFONACOT" },
			{ tipo: "004", clave: "004", concepto: "OTROS (PAGO DE ABONOS PRESTAMO)" },
		],
		opciones: { tipo: "O", periodicidad: "04" },
	},
	EXTRAORDINARIA: {
		id: CONFIG_ID.EXTRAORDINARIA,
		percepciones: [
			{ tipo: "002", clave: "002", concepto: "AGUINALDO", exento: true },
			{ tipo: "021", clave: "021", concepto: "PRIMA VACACIONAL", exento: true },
			{ tipo: "003", clave: "003", concepto: "PTU", exento: true },
		],
		otrospagos: [...SUBSIDIO_EMPLEO],
		deducciones: [{ tipo: "002", clave: "002", concepto: "ISR" }],
		opciones: { tipo: "E", periodicidad: "99" },
	},
	PERSONALIZADA: {
		id: CONFIG_ID.PERSONALIZADA,
		percepciones: [],
		otrospagos: [],
		deducciones: [],
		opciones: { tipo: "O", periodicidad: "04" },
	},
};

const ConfigSelector = props => {
	const [isSettingUp, setIsSettingUp] = useState(false);
	const localStorageCtx = useContext(LocalStorageContext);

	useEffect(() => {
		props.onSetConfig(CONFIGS.NORMAL);
	}, []);

	const showSettingUp = () => setIsSettingUp(true);
	const hideSettingUp = () => setIsSettingUp(false);

	const loadCustomConfig = () => {
		if (props.current.id !== CONFIG_ID.PERSONALIZADA) {
			let config = localStorageCtx.onGetCustomConfig() || CONFIGS.PERSONALIZADA;
			props.onSetConfig(config);
		}
	};

	const saveCustomConfig = config => {
		localStorageCtx.onSaveCustomConfig(config);
		props.onSetConfig(config);
	};

	return (
		<ButtonGroup fill>
			<Button
				fill
				onClick={() => (props.current.id !== CONFIG_ID.NORMAL ? props.onSetConfig(CONFIGS.NORMAL) : null)}
				active={props.current.id === CONFIG_ID.NORMAL}>
				Normal
			</Button>
			<Button
				fill
				onClick={() =>
					props.current.id !== CONFIG_ID.EXTRAORDINARIA ? props.onSetConfig(CONFIGS.EXTRAORDINARIA) : null
				}
				active={props.current.id === CONFIG_ID.EXTRAORDINARIA}>
				Extraordinaria
			</Button>
			<Button fill onClick={loadCustomConfig} active={props.current.id === CONFIG_ID.PERSONALIZADA}>
				Personalizada
			</Button>
			<AnchorButton icon='settings' disabled={props.current.id !== CONFIG_ID.PERSONALIZADA} onClick={showSettingUp} />
			<ConfigDrawer isOpen={isSettingUp} onHide={hideSettingUp} config={props.current} onSaveConfig={saveCustomConfig} />
		</ButtonGroup>
	);
};

export default ConfigSelector;
