import React from "react";

const NominaContext = React.createContext({
	getTabs: () => {},
	currentTab: "",
	onSetCurrentTab: id => {},
	imported: [],
	onSetImported: nominas => {},
	selected: [],
	onSetSelected: nominas => {},
	currentConfig: {},
	onChangeCurrentConfig: config => {},
	onUpdatePercepcionDataGravado: data => {},
	onUpdatePercepcionDataExento: data => {},
	onUpdateOtropagoData: data => {},
	onUpdateDeduccionData: data => {},
	onGetCsv: () => {},
	getFilledNominas: () => {},
});

export default NominaContext;
