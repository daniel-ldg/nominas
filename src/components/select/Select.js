import { AnchorButton, H5, Intent } from "@blueprintjs/core";
import { useContext, useEffect, useState } from "react";
import NominaContext from "../../store/NominaContext";
import EditableList from "../ui/editableList/EditableList";
import Spacer from "../ui/Spacer";

const ENCONTRADO = 1;
const NO_ENCONTRADO = 0;
const DUPLICADO = -1;

const Select = props => {
	const nominasCtx = useContext(NominaContext);
	const [data, setData] = useState("");

	useEffect(() => {
		if (nominasCtx.selected.length === 0) {
			setData("");
		}
	}, [nominasCtx.selected]);

	const isValid = input => {
		const nomina = findNomina(input);
		const found = nomina !== undefined;

		if (!found) {
			return NO_ENCONTRADO;
		}

		const unique =
			data
				.split("\n")
				.map(item => findNomina(item))
				.filter(item => item?.rfc === nomina.rfc).length === 1;

		return unique ? ENCONTRADO : DUPLICADO;
	};

	const findNomina = input =>
		nominasCtx.imported.find(nomina => {
			const rfc = nomina.rfc.replace("'", "").toUpperCase();
			const inputWords = input.split(" ");
			const nameWords = nomina.nombre.split(" ");
			return (
				rfc === input.toUpperCase() ||
				(nameWords.length === inputWords.length &&
					inputWords.every(word => nomina.nombre.toUpperCase().includes(word.toUpperCase())))
			);
		});

	const saveDataHandle = newData => {
		setData(newData);
	};

	const setSelectedHamdler = () => {
		const selected = data.split("\n").map(item => findNomina(item));
		nominasCtx.onSetSelected(selected);
	};

	return (
		<div style={{ display: props.hidden ? "none" : "block" }}>
			<H5>Seleccionar nóminas</H5>
			<EditableList
				noIdealStateLabel='No se han seleccionado nóminas'
				maxRows={1}
				growVertically={true}
				data={data}
				onSetData={saveDataHandle}
				isValid={isValid}
			/>
			<Spacer height='20' />
			<AnchorButton
				fill
				intent={Intent.PRIMARY}
				disabled={!data.split("\n").every(value => isValid(value) === ENCONTRADO)}
				onClick={setSelectedHamdler}>
				{nominasCtx.selected.length === 0 ? "Seleccionar" : "Actualizar selección"}
			</AnchorButton>
		</div>
	);
};

export default Select;
