import { useReducer, useState } from "react";
import NominaContext from "./NominaContext";

export const TABS_ID = {
	IMPORTAR: "importar",
	SELECCIONAR: "seleccionar",
	MODIFICAR: "modificar",
	EXPORTAR: "exportar",
	VERIFICAR: "verificar",
};

const ACTIONS = {
	CHANGE_CONFIG: 0,
	UPDATE_PERCEPCION_DATA_GRAVADO: 1,
	UPDATE_PERCEPCION_DATA_EXENTO: 2,
	UPDATE_OTROPAGO_DATA: 3,
	UPDATE_DEDUCCION_DATA: 4,
	CLEAR_INPUT_DATA: 5,
};

const dataIsValid = data => {
	const dataSplit = data.split("\n");
	return data === "" || dataSplit.every(value => !isNaN(value));
};

const configReducer = (prevState, action) => {
	switch (action.type) {
		case ACTIONS.CHANGE_CONFIG:
			action.newConfig.percepciones.forEach((percepcion, i) => {
				percepcion.id = i;
				percepcion.dataGravado = percepcion.dataGravado || "";
				percepcion.dataExento = percepcion.dataExento || "";
				percepcion.dataGravadoIsValid = dataIsValid(percepcion.dataGravado);
				percepcion.dataExentoIsValid = dataIsValid(percepcion.dataExento);
				percepcion.exento = percepcion.exento || false;
			});
			action.newConfig.otrospagos.forEach((otropago, i) => {
				otropago.id = i;
				otropago.data = otropago.data || "";
				otropago.dataIsValid = dataIsValid(otropago.data);
			});
			action.newConfig.deducciones.forEach((deduccion, i) => {
				deduccion.id = i;
				deduccion.data = deduccion.data || "";
				deduccion.dataIsValid = dataIsValid(deduccion.data);
			});
			return action.newConfig;

		case ACTIONS.UPDATE_PERCEPCION_DATA_GRAVADO: {
			let updatedData = prevState.percepciones.map(percepcion =>
				percepcion.id === action.id
					? { ...percepcion, dataGravado: action.data, dataGravadoIsValid: dataIsValid(action.data) }
					: percepcion
			);
			return { ...prevState, percepciones: updatedData };
		}

		case ACTIONS.UPDATE_PERCEPCION_DATA_EXENTO: {
			let updatedData = prevState.percepciones.map(percepcion =>
				percepcion.id === action.id
					? { ...percepcion, dataExento: action.data, dataExentoIsValid: dataIsValid(action.data) }
					: percepcion
			);
			return { ...prevState, percepciones: updatedData };
		}

		case ACTIONS.UPDATE_OTROPAGO_DATA: {
			let updatedData = prevState.otrospagos.map(otropago =>
				otropago.id === action.id ? { ...otropago, data: action.data, dataIsValid: dataIsValid(action.data) } : otropago
			);
			return { ...prevState, otrospagos: updatedData };
		}

		case ACTIONS.UPDATE_DEDUCCION_DATA: {
			let updatedData = prevState.deducciones.map(deduccion =>
				deduccion.id === action.id
					? { ...deduccion, data: action.data, dataIsValid: dataIsValid(action.data) }
					: deduccion
			);
			return { ...prevState, deducciones: updatedData };
		}

		case ACTIONS.CLEAR_INPUT_DATA:
			let newState = {
				...prevState,
				percepciones: prevState.percepciones.map(percepcion => ({
					...percepcion,
					dataGravado: "",
					dataExento: "",
				})),
				otrospagos: prevState.otrospagos.map(otropago => ({
					...otropago,
					data: "",
				})),
				deducciones: prevState.deducciones.map(deduccion => ({
					...deduccion,
					data: "",
				})),
			};
			return newState;

		default:
			break;
	}
};

const configInitialState = { id: "", percepciones: [], otrospagos: [], deducciones: [] };

const NominaContextProvider = props => {
	const [currentTab, setCurentTab] = useState(TABS_ID.IMPORTAR);
	const [imported, setImported] = useState([]);
	const [selected, setSelected] = useState([]);
	const [currentConfig, configDispatch] = useReducer(configReducer, configInitialState);

	const onImportHandler = nominas => {
		setImported(nominas);
		setCurentTab(TABS_ID.SELECCIONAR);
	};

	const onSelectHandler = seleccionados => {
		setSelected(seleccionados);
		setCurentTab(TABS_ID.MODIFICAR);
	};

	const onChangeCurrentConfigHandler = config => {
		configDispatch({ type: ACTIONS.CHANGE_CONFIG, newConfig: config });
	};

	const onUpdatePercepcionDataGravadoHandler = (id, data) => {
		configDispatch({ type: ACTIONS.UPDATE_PERCEPCION_DATA_GRAVADO, id: id, data: data });
	};

	const onUpdatePercepcionDataExentoHandler = (id, data) => {
		configDispatch({ type: ACTIONS.UPDATE_PERCEPCION_DATA_EXENTO, id: id, data: data });
	};

	const onUpdateOtropagoDataHandler = (id, data) => {
		configDispatch({ type: ACTIONS.UPDATE_OTROPAGO_DATA, id: id, data: data });
	};

	const onUpdateDeduccionDataHandler = (id, data) => {
		configDispatch({ type: ACTIONS.UPDATE_DEDUCCION_DATA, id: id, data: data });
	};

	const allDataIsValid =
		currentConfig.percepciones.every(percepcion => percepcion.dataGravadoIsValid && percepcion.dataExentoIsValid) &&
		currentConfig.otrospagos.every(otropago => otropago.dataIsValid) &&
		currentConfig.deducciones.every(deduccion => deduccion.dataIsValid);

	const onGetTabsHanndler = () => {
		return [
			{ id: TABS_ID.IMPORTAR, name: "Importar nóminas", shortName: "Importar", active: true },
			{
				id: TABS_ID.SELECCIONAR,
				name: "Seleccionar nóminas",
				shortName: "Seleccionar",
				active: imported.length !== 0,
			},
			{ id: TABS_ID.MODIFICAR, name: "Modificar datos", shortName: "Modificar", active: selected.length !== 0 },
			{ id: TABS_ID.EXPORTAR, name: "Exportar", active: selected.length !== 0 && allDataIsValid },
			{ id: TABS_ID.VERIFICAR, name: "Verificar", active: selected.length !== 0 && allDataIsValid },
		];
	};

	const getFilledNominas = () => {
		let nominas = selected.map(original => original.clone());

		nominas.forEach((nomina, i) => {
			currentConfig.percepciones.forEach(percepcion => {
				let gravado = percepcion.dataGravado.split("\n")[i] || "0";
				let exento = percepcion.dataExento.split("\n")[i] || "0";
				if (gravado !== "0" || exento !== "0") {
					nomina.agregarPercepcion(percepcion.tipo, percepcion.clave, percepcion.concepto, gravado, exento);
				}
			});

			// si la nomina incluye percepción de sueldo, aguinaldo o ptu se debe agregar subsidio al empleo
			// (y la propiedad de subsidio causado) (Aunque sean igual a 0)
			// los valores se encuentran el el arreglo de otrosPagos con las propiedades isSubsidioEmpleo y isSubsidioCausado
			const SUELDO = "'001";
			const AGUINALDO = "'002";
			const PTU = "'003";
			if (nomina.percepciones.some(percepcion => [SUELDO, AGUINALDO, PTU].includes(percepcion.clave))) {
				let subsidioEmpleo =
					currentConfig.otrospagos.find(otropago => otropago.isSubsidioEmpleo).data.split("\n")[i] || "0";
				let subsidioCausado =
					currentConfig.otrospagos.find(otropago => otropago.isSubsidioCausado).data.split("\n")[i] || "0";
				nomina.agregarOtroPago("'002", "'002", "'SUBSIDIO PARA EL EMPLEO", subsidioEmpleo);
				nomina.subsidioAlEmpleo = {
					subsidioCausado: subsidioCausado,
				};
			}

			currentConfig.otrospagos
				.filter(otropago => !otropago.isSubsidioEmpleo && !otropago.isSubsidioCausado)
				.forEach(otropago => {
					let importe = otropago.data.split("\n")[0] || "0";
					if (importe !== "0") {
						nomina.agregarOtroPago(otropago.tipo, otropago.clave, otropago.concepto, importe);
					}
				});

			currentConfig.deducciones.forEach(deduccion => {
				let importe = deduccion.data.split("\n")[i] || "0";
				if (importe !== "0") {
					nomina.agregarDeduccion(deduccion.tipo, deduccion.clave, deduccion.concepto, importe);
				}
			});

			nomina.setOptions(currentConfig.opciones);
		});

		return nominas;
	};

	const onGetCsvHandler = () =>
		getFilledNominas()
			.map(nomina => nomina.toCSV())
			.join();

	const onSetCurrentTabHandler = newTabId => {
		/*switch (newTabId) {
			case TABS_ID.IMPORTAR:
				setSelected([]);
			// fallthrough

			case TABS_ID.SELECCIONAR:
				configDispatch({ type: ACTIONS.CLEAR_INPUT_DATA });
			// fallthrough
			case TABS_ID.MODIFICAR:
			case TABS_ID.EXPORTAR:
			case TABS_ID.VERIFICAR:
				setCurentTab(newTabId);

				break;
			default:
				// unknow id. ignore
				break;
		}*/
		setCurentTab(newTabId);
	};

	return (
		<NominaContext.Provider
			value={{
				getTabs: onGetTabsHanndler,
				currentTab: currentTab,
				onSetCurrentTab: onSetCurrentTabHandler,
				imported: imported,
				onSetImported: onImportHandler,
				selected: selected,
				onSetSelected: onSelectHandler,
				currentConfig: currentConfig,
				onChangeCurrentConfig: onChangeCurrentConfigHandler,
				onUpdatePercepcionDataGravado: onUpdatePercepcionDataGravadoHandler,
				onUpdatePercepcionDataExento: onUpdatePercepcionDataExentoHandler,
				onUpdateOtropagoData: onUpdateOtropagoDataHandler,
				onUpdateDeduccionData: onUpdateDeduccionDataHandler,
				onGetCsv: onGetCsvHandler,
				getFilledNominas: getFilledNominas,
			}}>
			{props.children}
		</NominaContext.Provider>
	);
};

export default NominaContextProvider;
